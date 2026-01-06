import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { glob } from "zx";

import type { TransformContext, TransformFn } from "./types";

/** Logging utility - writes to stderr with prefix */
export const log = (msg: string) => console.error(`[agents-sync] ${msg}`);

/** Get the repository root directory (3 levels up from src/) */
export function getRepoRoot(): string {
  return resolve(import.meta.dirname, "..", "..", "..");
}

/** Get the package root directory (tooling/agents/) */
export function getPackageRoot(): string {
  return resolve(import.meta.dirname, "..");
}

/** Compute SHA-256 hash of content */
export function hashContent(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

/** Normalize line endings to LF */
export function normalizeLF(content: string): string {
  return content.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

/** Read file with LF normalization */
export function readFileNormalized(filePath: string): string {
  const content = readFileSync(filePath, "utf8");
  return normalizeLF(content);
}

/** Write file with parent directory creation */
export function writeFileSafe(filePath: string, content: string): void {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(filePath, content, "utf8");
}

/** Check if two contents are equal (byte-for-byte after LF normalization) */
export function contentsEqual(a: string, b: string): boolean {
  return normalizeLF(a) === normalizeLF(b);
}

/** Apply transforms to content in order */
export function applyTransforms(
  content: string,
  transforms: TransformFn[],
  context: TransformContext
): string {
  return transforms.reduce(
    (acc, transform) => transform(acc, context),
    content
  );
}

/** Resolve glob patterns and return sorted file paths */
export async function resolveGlobs(
  patterns: string[],
  cwd: string
): Promise<string[]> {
  const files = new Set<string>();
  for (const pattern of patterns) {
    const matches = await glob(pattern, { cwd, absolute: true });
    for (const match of matches) {
      files.add(match);
    }
  }
  // Return sorted for deterministic ordering
  return [...files].sort();
}

/** Build transform context for a file */
export function buildContext(
  sourcePath: string,
  targetPath: string,
  targetKey: string,
  repoRoot: string
): TransformContext {
  return {
    sourcePath,
    sourceRelative: relative(repoRoot, sourcePath).replace(/\\/g, "/"),
    targetPath,
    targetRelative: relative(repoRoot, targetPath).replace(/\\/g, "/"),
    extension: extname(sourcePath),
    targetKey,
  };
}

/**
 * Compute the target path for a source file.
 * Preserves directory structure under skills/.
 *
 * Example:
 *   source: tooling/agents/src/skills/ci-verify/SKILL.md
 *   targetDir: .claude/skills
 *   result: {repoRoot}/.claude/skills/ci-verify/SKILL.md
 */
export function computeTargetPath(
  sourcePath: string,
  targetDir: string,
  repoRoot: string,
  packageRoot: string
): string {
  // Get the relative path from src/skills/
  const skillsDir = join(packageRoot, "src", "skills");
  const relativeFromSkills = relative(skillsDir, sourcePath);

  // Join with target directory
  return join(repoRoot, targetDir, relativeFromSkills);
}
