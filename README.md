# Agentic Monorepo Starter

Monorepo starter for building agent-friendly web apps (Next.js + Vite) with preconfigured tooling, shared UI, and repo-level AI settings.

## What's inside

- Next.js app in `apps/web` (App Router, alias `~/*`)
- Vite playground in `apps/playground` (React 19, Tailwind CSS 4)
- Shared UI package `@repo/ui` (shadcn/Radix/Tailwind)
- Shared configs: ESLint, Prettier (import + Tailwind sorting), TypeScript, Turbo
- Agent tooling in `tooling/agents` (sync/check agent docs)
- AI agent settings in `.claude/`, `.codex/`, `.cursor/`, and `.github/`

## Prerequisites

- Node.js 24.12.0 (`.nvmrc`)
- pnpm 10.19.0 (see `packageManager` in `package.json`)

## Getting started

```bash
pnpm install
pnpm --filter web dev         # http://localhost:3000
# or
pnpm --filter playground dev  # http://localhost:3001
```

## Common tasks

- Lint: `pnpm lint`
- Typecheck: `pnpm typecheck`
- Test: `pnpm test`
- Build: `pnpm build`
- Format: `pnpm format`
- Format check: `pnpm format:check`
- Agents check: `pnpm agents:check`
- Agents sync: `pnpm agents:sync`

## Working with Codex

- Codex CLI helpers live under `.codex/` (skills for frontend and CI verification).
- Follow `AGENTS.md` for workflow rules (no git ops, keep diffs focused, no secrets).
- Default verification commands: `pnpm typecheck`, `pnpm lint`, `pnpm test` (when tests exist), `pnpm format` or `pnpm format:check` when needed.

## Working with Claude Code

- Agent settings are in `.claude/settings.json` (hook and permission config).
- Post-tool hook runs `pnpm format:changed-files`, which uses `tooling/agents/scripts/format-changed-files.ts` to Prettier-format touched files with supported extensions.
- Use the same verification flow as Codex: `pnpm typecheck`, `pnpm lint`, `pnpm test` (when tests exist), `pnpm format` or `pnpm format:check` when relevant.

## Working with Cursor

- Cursor skills live under `.cursor/skills` and are kept in sync by `pnpm agents:sync`.
- Use the same verification flow as Codex: `pnpm typecheck`, `pnpm lint`, `pnpm test` (when tests exist), `pnpm format` or `pnpm format:check` when relevant.

## Working with GitHub Copilot

- Repo-wide and workflow guidance: `.github/copilot-instructions.md`.
- VS Code Copilot Chat uses `.vscode/settings.json` to point commit and PR generation at `.github/commit-message-instructions.md` and `.github/pull-request-description-instructions.md`.
- Copilot should respect `AGENTS.md`: import boundaries, no secrets, no git operations, and focused diffs without new tooling unless discussed.
- Prefer pnpm+Turbo commands (`pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm format`, `pnpm format:check`) and include files touched plus validation commands in proposals.

## Repo conventions (see AGENTS.md for full contract)

- Apps may import packages; packages must not import apps.
- Keep diffs focused; avoid drive-by refactors or new tooling without discussion.
- No secrets or `.env*` files; code must be public-safe.
- Git operations are human-only -- do not commit, push, or change branches here.
