#!/usr/bin/env npx tsx
import { existsSync } from "node:fs";
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
  writeFileSafe,
} from "../src/utils.js";
import type { SyncResult } from "../src/types.js";
import config from "../agents.config.js";

async function main(): Promise<void> {
  log("Starting agents sync...");

  const repoRoot = getRepoRoot();
  const packageRoot = getPackageRoot();
  const results: SyncResult[] = [];

  // Process each source configuration
  for (const source of config.sources) {
    // Resolve source file patterns
    const sourceFiles = await resolveGlobs(source.patterns, packageRoot);

    if (sourceFiles.length === 0) {
      log(`Warning: No files matched patterns: ${source.patterns.join(", ")}`);
      continue;
    }

    log(`Found ${sourceFiles.length} source file(s) for patterns: ${source.patterns.join(", ")}`);

    // Process each target
    for (const [targetKey, targetConfig] of Object.entries(source.targets)) {
      // Skip disabled targets
      if (targetConfig.enabled === false) {
        log(`Skipping disabled target: ${targetKey}`);
        continue;
      }

      const targetDesc = targetConfig.description || targetKey;
      log(`Syncing to ${targetDesc} (${targetConfig.dir})...`);

      // Process each source file
      for (const sourcePath of sourceFiles) {
        const targetPath = computeTargetPath(sourcePath, targetConfig.dir, repoRoot, packageRoot);

        const context = buildContext(sourcePath, targetPath, targetKey, repoRoot);

        // Read and transform source content
        let sourceContent = readFileNormalized(sourcePath);

        // Apply global transforms first
        if (config.globalTransforms) {
          sourceContent = applyTransforms(sourceContent, config.globalTransforms, context);
        }

        // Apply source-specific transforms
        if (source.transforms) {
          sourceContent = applyTransforms(sourceContent, source.transforms, context);
        }

        // Check if target exists and compare
        const targetExists = existsSync(targetPath);
        let result: SyncResult;

        if (!targetExists) {
          // Create new file
          writeFileSafe(targetPath, sourceContent);
          result = {
            sourcePath: context.sourceRelative,
            targetPath: context.targetRelative,
            targetKey,
            status: "created",
          };
          log(`  Created: ${context.targetRelative}`);
        } else {
          // Compare with existing content
          const existingContent = readFileNormalized(targetPath);

          if (contentsEqual(sourceContent, existingContent)) {
            result = {
              sourcePath: context.sourceRelative,
              targetPath: context.targetRelative,
              targetKey,
              status: "unchanged",
            };
            log(`  Unchanged: ${context.targetRelative}`);
          } else {
            // Target differs - warn but overwrite
            const warning = "Target file had local modifications that were overwritten";
            writeFileSafe(targetPath, sourceContent);
            result = {
              sourcePath: context.sourceRelative,
              targetPath: context.targetRelative,
              targetKey,
              status: "warning",
              warning,
            };
            log(`  Warning: ${context.targetRelative} - ${warning}`);
          }
        }

        results.push(result);
      }
    }
  }

  // Summary
  const created = results.filter((r) => r.status === "created").length;
  const updated = results.filter((r) => r.status === "warning").length;
  const unchanged = results.filter((r) => r.status === "unchanged").length;
  const warnings = results.filter((r) => r.warning);

  log("");
  log("Sync complete:");
  log(`  Created: ${created}`);
  log(`  Updated (with warnings): ${updated}`);
  log(`  Unchanged: ${unchanged}`);
  log(`  Total: ${results.length}`);

  if (warnings.length > 0) {
    log("");
    log("Warnings:");
    for (const w of warnings) {
      log(`  - ${w.targetPath}: ${w.warning}`);
    }
  }

  log("Done.");
}

main().catch((err) => {
  log(`Error: ${String(err)}`);
  process.exit(1);
});
