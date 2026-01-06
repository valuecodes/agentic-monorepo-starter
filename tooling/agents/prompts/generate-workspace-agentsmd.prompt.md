You are a coding agent working inside this Turborepo monorepo. Your task is to **generate a scoped `AGENTS.md` for ONE specific workspace** (an individual app or package), e.g. `apps/landing/AGENTS.md` or `packages/ui/AGENTS.md`.

## Inputs

- Target workspace path: <PASTE ONE PATH HERE> (example: `apps/landing`)
- You must treat `/AGENTS.md` as the global contract and **do not duplicate it**.

## Goals

- Create **only** `<TARGET>/AGENTS.md`.
- The file must contain **only deltas** from the root contract: workspace-specific commands, conventions, and gotchas.
- Keep it short and practical (target ~40–120 lines).

## Repo scan (focus only on what matters)

Read:

- `<TARGET>/package.json` (name, scripts, deps)
- Any workspace-local configs:
  - Next: `next.config.*`, `app/` or `pages/`
  - Astro: `astro.config.*`, `src/`
  - Vite: `vite.config.*`, `src/`
  - UI pkg: exports (`src/index.*`), build config, tsconfig overrides
- Root configs that affect this workspace:
  - `/turbo.json*`, `/package.json` scripts, workspace config
  - `.github/workflows/*` only insofar as they call this workspace (filters, turbo tasks)

From this, determine:

- The correct `pnpm --filter <workspaceName>` value (from `<TARGET>/package.json#name`).
- The workspace’s dev/build/typecheck/test commands **as actually implemented** (don’t guess).
- Any local conventions that differ from root (routing patterns, folder conventions, public assets, component patterns, etc.).
- Any required env vars **only if they are documented in-repo** (README, `.env.example`).

## Write `<TARGET>/AGENTS.md` (delta-only format)

Use this structure:

1. **Scope**

- One sentence: “This directory inherits `/AGENTS.md`. This file lists only additions/overrides.”

2. **What this workspace is**

- 2–5 bullets describing the workspace purpose and stack (Next/Astro/Vite/UI pkg).
- Mention any special constraints (e.g., landing performance, docs content style).

3. **Workspace commands**

- Provide exact commands, preferring filtered pnpm:
  - Dev (if applicable)
  - Build
  - Lint / Typecheck (only if the workspace has special scripts; otherwise say it uses repo-wide turbo tasks)
  - Test (only if present)

4. **Local conventions (deltas)**
   Only include rules that are specific here, e.g.:

- Next.js: App Router conventions, server vs client components, image optimization rules, metadata conventions.
- Astro docs: content structure, sidebar/nav conventions, MDX usage, link style.
- Vite playground: examples structure, import patterns from `packages/ui`.
- UI package: shadcn conventions, exporting components, no app imports, how to add a new component, barrel export rules.

5. **Footguns / gotchas**

- 2–6 bullets: common mistakes and how to avoid them (based on repo reality).

## Constraints

- Do NOT modify any other files.
- Do NOT copy the full root rules. If you need to reference them, link: “See `/AGENTS.md`”.
- Do NOT add new scripts or dependencies.
- Do NOT add nested `AGENTS.md` below this workspace unless explicitly requested.

## Output requirements

- Commit (or provide a patch) that adds **only** `<TARGET>/AGENTS.md`.
- In your final response, include:
  - The workspace name you inferred and where you found it (`<TARGET>/package.json`)
  - The exact commands you documented (must match scripts)
  - Validation commands relevant to this workspace

Proceed now: generate the scoped `AGENTS.md` for <TARGET>.
