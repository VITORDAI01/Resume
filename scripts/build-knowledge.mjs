import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { loadLocalEnv } from "./env.mjs";

const root = resolve(import.meta.dirname, "..");
const sourcesPath = resolve(root, "knowledge/sources.json");
const indexPath = resolve(root, "knowledge/index.json");
const embeddingModel = "Qwen3-Embedding-0.6B";

await loadLocalEnv(root);

const apiKey = process.env.AIPING_API_KEY;
if (!apiKey) {
  throw new Error("缺少 AIPING_API_KEY，请在 .env.local 中配置后重试。");
}

const sourceText = await readFile(sourcesPath, "utf8");
const sourceHash = createHash("sha256").update(sourceText).digest("hex");
const sources = JSON.parse(sourceText);

try {
  const existing = JSON.parse(await readFile(indexPath, "utf8"));
  if (existing.sourceHash === sourceHash && existing.model === embeddingModel) {
    console.log(`知识索引已是最新版本，共 ${existing.chunks.length} 个片段。`);
    process.exit(0);
  }
} catch (error) {
  if (error.code !== "ENOENT") console.warn("现有索引不可用，将重新生成。");
}

const response = await fetch("https://aiping.cn/api/v1/embeddings", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    model: embeddingModel,
    input: sources.map((source) => source.text),
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
if (embeddings.length !== sources.length) throw new Error("Embedding 数量与知识片段数量不一致。");

const chunks = sources.map((source, index) => ({
  ...source,
  embedding: embeddings[index].embedding,
}));
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

console.log(`已生成本地向量索引：${chunks.length} 个片段，${dimension} 维。`);
