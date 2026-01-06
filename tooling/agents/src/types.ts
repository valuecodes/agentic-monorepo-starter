/**
 * Context provided to transform functions.
 */
export interface TransformContext {
  /** Absolute path to the source file */
  sourcePath: string;
  /** Relative path from repo root to source file */
  sourceRelative: string;
  /** Absolute path to the target file */
  targetPath: string;
  /** Relative path from repo root to target file */
  targetRelative: string;
  /** File extension (e.g., ".md") */
  extension: string;
  /** Target key (e.g., "claude", "codex") */
  targetKey: string;
}

/**
 * Transform function that can modify file content during sync.
 * Return the transformed content string.
 */
export type TransformFn = (content: string, ctx: TransformContext) => string;

/**
 * Configuration for a single sync target.
 */
export interface TargetConfig {
  /** Target directory relative to repo root (e.g., ".claude/skills") */
  dir: string;
  /** Optional description for logging */
  description?: string;
  /** Whether this target is enabled (default: true) */
  enabled?: boolean;
}

/**
 * Configuration for a sync source group.
 */
export interface SourceConfig {
  /** Glob patterns for source files relative to tooling/agents/ */
  patterns: string[];
  /** Map of target key to target configuration */
  targets: Record<string, TargetConfig>;
  /** Optional transforms applied to all files in this source group */
  transforms?: TransformFn[];
}

/**
 * Root configuration schema for agents.config.ts.
 */
export interface AgentsConfig {
  /** Configuration version for future compatibility */
  version: 1;
  /** Array of source configurations */
  sources: SourceConfig[];
  /** Global transforms applied to all files (before source-specific transforms) */
  globalTransforms?: TransformFn[];
}

/**
 * Result of a sync operation for a single file.
 */
export interface SyncResult {
  sourcePath: string;
  targetPath: string;
  targetKey: string;
  status: "created" | "updated" | "unchanged" | "warning";
  /** Warning message if target had local modifications */
  warning?: string;
}

/**
 * Result of a check operation for a single file.
 */
export interface CheckResult {
  sourcePath: string;
  targetPath: string;
  targetKey: string;
  status: "in_sync" | "drift" | "missing";
  /** Details if drifted or missing */
  details?: string;
}
