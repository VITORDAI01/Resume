import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadLocalEnv } from "./env.mjs";

const root = resolve(import.meta.dirname, "..");
const sourcesPath = resolve(root, "knowledge/private/sources.json");
const indexPath = resolve(root, "knowledge/private/index.json");
const embeddingModel = "Qwen3-Embedding-0.6B";
const indexFormatVersion = "questions-v1";

await loadLocalEnv(root);

const apiKey = process.env.AIPING_API_KEY;
if (!apiKey) {
  throw new Error("缺少 AIPING_API_KEY，请在 .env.local 中配置后重试。");
}

const sourceText = await readFile(sourcesPath, "utf8");
const sourceHash = createHash("sha256").update(`${indexFormatVersion}\n${sourceText}`).digest("hex");
const sources = JSON.parse(sourceText);
let existingIndex = null;

try {
  existingIndex = JSON.parse(await readFile(indexPath, "utf8"));
  if (existingIndex.sourceHash === sourceHash && existingIndex.model === embeddingModel) {
    console.log(`知识索引已是最新版本，共 ${existingIndex.chunks.length} 个片段。`);
    process.exit(0);
  }
} catch (error) {
  if (error.code !== "ENOENT") console.warn("现有索引不可用，将重新生成。");
}

const existingChunks = new Map((existingIndex?.chunks || []).map((chunk) => [chunk.id, chunk]));
const canReuseExisting = existingIndex?.model === embeddingModel;
const chunks = new Array(sources.length);
const pending = [];

for (const [sourceIndex, source] of sources.entries()) {
  const previous = existingChunks.get(source.id);
  const sameQuestions = JSON.stringify(previous?.questions || []) === JSON.stringify(source.questions || []);
  if (canReuseExisting && previous?.text === source.text && sameQuestions && previous.embedding?.length) {
    chunks[sourceIndex] = { ...source, embedding: previous.embedding };
  } else {
    pending.push({
      sourceIndex,
      input: [...(source.questions || []), source.text].join("\n"),
    });
  }
}

if (pending.length > 0) {
  const response = await fetch("https://aiping.cn/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: embeddingModel,
      input: pending.map(({ input }) => input),
      encoding_format: "float",
      extra_body: {
        consume_type: "api",
        provider: { sort: ["latency"], allow_fallbacks: true },
      },
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Embedding 请求失败（${response.status}）：${message.slice(0, 300)}`);
  }

  const payload = await response.json();
  const embeddings = [...payload.data].sort((a, b) => a.index - b.index);
  if (embeddings.length !== pending.length) throw new Error("Embedding 数量与待更新知识片段数量不一致。");
  for (const [pendingIndex, { sourceIndex }] of pending.entries()) {
    chunks[sourceIndex] = { ...sources[sourceIndex], embedding: embeddings[pendingIndex].embedding };
  }
}

const dimension = chunks[0]?.embedding?.length;
if (!dimension) throw new Error("Embedding 响应中没有有效向量。");

await writeFile(indexPath, `${JSON.stringify({
  version: 1,
  generatedAt: new Date().toISOString(),
  sourceHash,
  model: embeddingModel,
  dimension,
  chunks,
}, null, 2)}\n`);

console.log(`已生成本地向量索引：${chunks.length} 个片段，复用 ${chunks.length - pending.length} 个，新生成 ${pending.length} 个，${dimension} 维。`);
