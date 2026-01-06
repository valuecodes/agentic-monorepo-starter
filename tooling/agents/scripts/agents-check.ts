#!/usr/bin/env npx tsx
import { existsSync } from "node:fs";

import config from "../agents.config";
import type { CheckResult } from "../src/types";
import {
  applyTransforms,
  buildContext,
  computeTargetPath,
  contentsEqual,
  getPackageRoot,
  getRepoRoot,
  log,
  readFileNormalized,
  resolveGlobs,
} from "../src/utils";

async function main(): Promise<void> {
  log("Checking agents sync status...");

  const repoRoot = getRepoRoot();
  const packageRoot = getPackageRoot();
  const results: CheckResult[] = [];
  let hasDrift = false;

  // Process each source configuration
  for (const source of config.sources) {
    // Resolve source file patterns
    const sourceFiles = await resolveGlobs(source.patterns, packageRoot);

    if (sourceFiles.length === 0) {
      log(`Warning: No files matched patterns: ${source.patterns.join(", ")}`);
      continue;
    }

    // Process each target
    for (const [targetKey, targetConfig] of Object.entries(source.targets)) {
      // Skip disabled targets
      if (targetConfig.enabled === false) {
        continue;
      }

      // Process each source file
      for (const sourcePath of sourceFiles) {
        const targetPath = computeTargetPath(
          sourcePath,
          targetConfig.dir,
          repoRoot,
          packageRoot
        );

        const context = buildContext(
          sourcePath,
          targetPath,
          targetKey,
          repoRoot
        );

        // Read and transform source content (expected content)
        let expectedContent = readFileNormalized(sourcePath);

        // Apply global transforms first
        if (config.globalTransforms) {
          expectedContent = applyTransforms(
            expectedContent,
            config.globalTransforms,
            context
          );
        }

        // Apply source-specific transforms
        if (source.transforms) {
          expectedContent = applyTransforms(
            expectedContent,
            source.transforms,
            context
          );
        }

        // Check target file
        let result: CheckResult;

        if (!existsSync(targetPath)) {
          result = {
            sourcePath: context.sourceRelative,
            targetPath: context.targetRelative,
            targetKey,
            status: "missing",
            details: "Target file does not exist",
          };
          hasDrift = true;
        } else {
          const actualContent = readFileNormalized(targetPath);

          if (contentsEqual(expectedContent, actualContent)) {
            result = {
              sourcePath: context.sourceRelative,
              targetPath: context.targetRelative,
              targetKey,
              status: "in_sync",
            };
          } else {
            // Generate a simple diff description
            const expectedLines = expectedContent.split("\n").length;
            const actualLines = actualContent.split("\n").length;
            result = {
              sourcePath: context.sourceRelative,
              targetPath: context.targetRelative,
              targetKey,
              status: "drift",
              details: `Content mismatch (expected ${expectedLines} lines, got ${actualLines} lines)`,
            };
            hasDrift = true;
          }
        }

        results.push(result);
      }
    }
  }

  // Output results
  const inSync = results.filter((r) => r.status === "in_sync").length;
  const drifted = results.filter((r) => r.status === "drift").length;
  const missing = results.filter((r) => r.status === "missing").length;

  log("");
  log("Check results:");
  log(`  In sync: ${inSync}`);
  log(`  Drifted: ${drifted}`);
  log(`  Missing: ${missing}`);
  log(`  Total: ${results.length}`);

  if (hasDrift) {
    log("");
    log("Drift detected:");
    for (const r of results) {
      if (r.status !== "in_sync") {
        log(`  - ${r.targetPath} (${r.status}): ${r.details || "No details"}`);
      }
    }
    log("");
    log("Run 'pnpm agents:sync' to fix drift.");
    process.exit(1);
  }

  log("");
  log("All files in sync.");
}

main().catch((err) => {
  log(`Error: ${String(err)}`);
  process.exit(1);
});
