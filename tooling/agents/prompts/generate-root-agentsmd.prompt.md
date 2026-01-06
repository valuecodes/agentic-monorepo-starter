You are a coding agent working inside this Turborepo monorepo. Your task is to **generate a root-level `AGENTS.md`** that accurately reflects the repo’s current structure, scripts, and CI expectations.

## Goals

- Create **only** `/AGENTS.md` (do **not** create nested `AGENTS.md` files).
- The content must be **grounded in what exists in the repo** (read configs; don’t guess).
- Keep it **starter-friendly**: a new contributor should be productive in <10 minutes.
- Keep it **CI-safe**: reflect what GitHub Actions actually runs.

## Scan the repo (read-only discovery)

Inspect at minimum:

- `package.json` at repo root (package manager, scripts, engines)
- workspace config: `pnpm-workspace.yaml` / `turbo.json` / `turbo.jsonc`
- apps and packages directories (e.g. `apps/*`, `packages/*`) and their `package.json`
- tooling configs (ESLint, TS configs): `.eslintrc*`, `eslint.config.*`, `tsconfig*.json`, `biome.json` if present
- GitHub Actions workflows: `.github/workflows/*` (identify required checks and commands)
- docs entrypoints if relevant (`apps/docs`, Astro config), Next/Vite configs as needed

From this scan, determine:

- Exact workspace names / filters (what `pnpm --filter <name>` should be)
- Canonical commands for: install, dev (per app), lint, typecheck, build, test (if present)
- The current repo structure and boundaries (apps vs packages)
- Any “must know” constraints (Node version, pnpm version, env vars, build outputs)
- Turbo pipeline expectations (task names, dependencies)

## Write `/AGENTS.md` (single file)

Create a clean, concise markdown document with these sections:

1. **Repo Contract**

- What this repo is (Turborepo monorepo starter optimized for agentic coding)
- Non-negotiables: tight diffs, no drive-by refactors, no secrets, public-safe

2. **Monorepo Structure**

- List `apps/*` and `packages/*` that exist _right now_ with a one-line description each
- Mention where shared UI lives (if applicable)

3. **Commands**

- Provide exact commands (copied from repo reality) for:
  - Install
  - Lint
  - Typecheck
  - Build
  - Test (only if configured)
  - Dev (per app, using `pnpm --filter ... dev` or repo’s standard)
- Prefer `pnpm turbo ...` where that’s how the repo runs in CI

4. **Boundaries**

- Rules like: apps can import from packages; packages must not import from apps
- Workspace dependency policy: `workspace:*` for internal deps

5. **Coding Standards**

- TypeScript: strict boundaries, avoid `any`, export types explicitly where needed
- UI: shadcn-style conventions if `packages/ui` exists, avoid duplication across apps
- Keep landing fast/lightweight if a Next.js landing exists

6. **CI / Definition of Done**

- Summarize what GitHub Actions runs (lint/typecheck/build) based on workflows
- “Done” checklist: run the same commands locally, ensure clean output

7. **Agent Workflow Expectations**

- Required response format for agents working in this repo:
  - Plan → Edits (file-by-file) → Review notes (blockers/suggestions/nits) → Validation commands
- Rules for changing configs / adding deps:
  - Must update Turbo pipeline + CI + docs (only if you detect those patterns exist)

## Constraints

- Do not introduce new tooling, scripts, or refactors—this is **documentation-only**.
- Do not invent commands or filters. If something is ambiguous, resolve it by finding the source file.
- Keep the file practical and not overly long (target ~120–220 lines).

## Output requirements

- Commit (or provide a patch) that adds **only** `AGENTS.md` at repo root.
- In your final response, include:
  - A brief summary of what you inferred (with references to file paths you used)
  - The exact validation commands to run (must match CI)

Proceed now: scan the repo and create `/AGENTS.md`.
