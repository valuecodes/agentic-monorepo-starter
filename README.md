# Turborepo Agents Starter

Monorepo starter for building agent-friendly Next.js apps with preconfigured tooling, shared UI, and repo-level AI settings.

## What's inside

- Next.js app in `apps/web` (App Router, alias `~/*`)
- Shared UI package `@turborepo-agents/ui` (shadcn/Radix/Tailwind)
- Shared configs: ESLint, Prettier (import + Tailwind sorting), TypeScript, Turbo
- AI agent settings in `.claude/`, `.codex/`, and `.github/`

## Prerequisites

- Node.js 24.12.0 (`.nvmrc`)
- pnpm 10.19.0 (see `packageManager` in `package.json`)

## Getting started

```bash
pnpm install
pnpm --filter web dev
```

## Common tasks

- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Build: `pnpm build`
- Format: `pnpm format`

## Working with Codex

- Codex CLI helpers live under `.codex/` (skills for frontend and CI verification).
- Follow `AGENTS.md` for workflow rules (no git ops, keep diffs focused, no secrets).
- Default verification commands: `pnpm typecheck`, `pnpm lint`, `pnpm format` when needed.

## Working with Claude Code

- Agent settings are in `.claude/settings.json` (hook and permission config).
- Post-tool hook runs `pnpm format-changed-files`, which uses `scripts/format-changed-files.ts` to Prettier-format touched files with supported extensions.
- Use the same verification flow as Codex: `pnpm typecheck`, `pnpm lint`, `pnpm format` when relevant.

## Working with GitHub Copilot

- Repo-wide and workflow guidance: `.github/copilot-instructions.md`.
- Copilot should respect `AGENTS.md`: import boundaries, no secrets, no git operations, and focused diffs without new tooling unless discussed.
- Prefer pnpm+Turbo commands (`pnpm lint`, `pnpm typecheck`, `pnpm build`, `pnpm format`) and include files touched plus validation commands in proposals.

## Repo conventions (see AGENTS.md for full contract)

- Apps may import packages; packages must not import apps.
- Keep diffs focused; avoid drive-by refactors or new tooling without discussion.
- No secrets or `.env*` files; code must be public-safe.
- Git operations are human-only -- do not commit, push, or change branches here.
