import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import { loadLocalEnv } from "./env.mjs";

const root = resolve(import.meta.dirname, "..");
await loadLocalEnv(root);

if (!process.env.AIPING_API_KEY) {
  throw new Error("缺少 AIPING_API_KEY，请先配置 .env.local。");
}

const indexPath = resolve(root, "knowledge/private/index.json");
try {
  await access(indexPath);
} catch {
  const indexer = spawn(process.execPath, ["scripts/build-knowledge.mjs"], {
    cwd: root,
    env: process.env,
    stdio: "inherit",
  });
  const code = await new Promise((resolveCode) => indexer.on("exit", resolveCode));
  if (code !== 0) process.exit(code ?? 1);
}

const children = [
  spawn(process.execPath, ["server/index.mjs"], { cwd: root, env: process.env, stdio: "inherit" }),
  spawn(process.execPath, ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1"], { cwd: root, env: process.env, stdio: "inherit" }),
];

const stop = () => children.forEach((child) => child.kill("SIGTERM"));
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
children.forEach((child) => child.on("exit", (code) => {
  if (code && code !== 0) {
    stop();
    process.exit(code);
  }
}));
