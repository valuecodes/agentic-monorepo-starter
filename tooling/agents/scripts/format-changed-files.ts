#!/usr/bin/env npx tsx
import { existsSync } from "node:fs";
import path from "node:path";
import { $ } from "zx";

$.verbose = false;

const log = (msg: string) => console.error(`[format-hook] ${msg}`);

const supportedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".yaml",
  ".yml",
]);

type HookPayload = {
  tool_input?: {
    file_path?: string;
    edits?: Array<{ file_path?: string }>;
    [key: string]: unknown;
  };
  tool_response?: {
    filePath?: string;
    [key: string]: unknown;
  };
};

async function readStdin(): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks).toString("utf8").trim();
}

function collectFilePaths(data: HookPayload): string[] {
  const found = new Set<string>();

  const direct = data?.tool_input?.file_path;
  if (typeof direct === "string" && direct.trim()) found.add(direct.trim());

  const edits = data?.tool_input?.edits;
  if (Array.isArray(edits)) {
    for (const e of edits) {
      const fp = e?.file_path;
      if (typeof fp === "string" && fp.trim()) found.add(fp.trim());
    }
  }

  const resp = data?.tool_response?.filePath;
  if (typeof resp === "string" && resp.trim()) found.add(resp.trim());

  return [...found];
}

function resolveFilePath(fp: string): string {
  if (path.isAbsolute(fp)) return fp;

  const projectDir = process.env.CLAUDE_PROJECT_DIR;
  if (projectDir) return path.resolve(projectDir, fp);

  return path.resolve(process.cwd(), fp);
}

async function formatWithPrettier(absPath: string) {
  await $`pnpm exec prettier --write ${absPath}`;
}

async function main() {
  log("Starting...");

  const raw = await readStdin();
  if (!raw) {
    log("No stdin payload received. Exiting.");
    process.exit(0);
  }

  let data: HookPayload;
  try {
    data = JSON.parse(raw) as HookPayload;
  } catch (e) {
    log(`Failed to parse JSON payload. Raw length=${raw.length}`);
    log(String(e));
    process.exit(0);
  }

  const paths = collectFilePaths(data);
  if (paths.length === 0) {
    log("No file paths found in payload. Exiting.");
    process.exit(0);
  }

  const resolved = paths.map(resolveFilePath);

  const toFormat = resolved.filter((abs) => {
    const ext = path.extname(abs);
    if (!supportedExtensions.has(ext)) {
      log(`Skipping unsupported ext: ${ext} (${abs})`);
      return false;
    }
    if (!existsSync(abs)) {
      log(`Skipping missing file: ${abs}`);
      return false;
    }
    return true;
  });

  if (toFormat.length === 0) {
    log("No files eligible for formatting. Exiting.");
    process.exit(0);
  }

  log(`Formatting ${toFormat.length} file(s): ${toFormat.join(", ")}`);

  await Promise.all(toFormat.map((abs) => formatWithPrettier(abs)));

  log("Done.");
}

main().catch((err) => {
  log(`Error: ${String(err)}`);
  process.exit(1);
});
