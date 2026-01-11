# Agentic Monorepo Starter

A production-grade Turborepo template for agentic development: strict repo guardrails, consistent tooling, and clear package boundaries — so agents move fast without turning the codebase into spaghetti.

## Use this template

Use GitHub’s **Use this template** button.

After creating your repo:

- Rename package scope (optional): replace `@repo/*` with your own scope (e.g. `@acme/*`)
- Update `name`, `description`, and links in `package.json`
- Run the checks once to verify everything is green:
  - `pnpm turbo lint typecheck build`

## What's inside

- Next.js app in `apps/web` (App Router, alias `~/*`)
- Vite playground in `apps/playground` (React 19, Tailwind CSS 4)
- Shared UI package `@repo/ui` (shadcn/Radix/Tailwind)
- Shared configs: ESLint, Prettier (import + Tailwind sorting), TypeScript, Turbo
- Agent tooling in `tooling/agents` (sync/check agent docs)
- AI agent settings in `.claude/`, `.codex/`, `.cursor/`, and `.github/`

Repo map:

```text
.github
  ├─ workflows
  │  ├─ main.yml (CI on main: lint/typecheck/test/format/agents)
  │  └─ feature.yml (CI on PRs)
  ├─ copilot-instructions.md (Copilot guidance)
  ├─ commit-message-instructions.md (commit message guidance)
  └─ pull-request-description-instructions.md (PR description guidance)
.vscode
  ├─ extensions.json (recommended VS Code extensions)
  └─ settings.json (workspace settings)
.claude
  ├─ settings.json (Claude Code hooks + permissions)
  └─ skills (Claude skill docs synced by agents:sync)
.codex
  ├─ config.toml (Codex CLI config)
  └─ skills (Codex skill docs)
.cursor
  └─ skills (Cursor skill docs synced by agents:sync)
apps
  ├─ web
  │  ├─ Next.js 16.1.1 + React 19
  │  ├─ App Router with alias ~/*
  │  └─ Tailwind CSS v4 UI surface
  └─ playground
     ├─ Vite 7 + React 19
     ├─ Tailwind CSS v4
     └─ UI experimentation sandbox
packages
  └─ ui
     ├─ shadcn/ui-style components
     ├─ Radix UI primitives + lucide-react icons
     └─ Tailwind utilities, styles, and exports
tooling
  ├─ agents
  │  ├─ agents:check (verify agent doc sync)
  │  └─ agents:sync (sync skills across tools)
  ├─ eslint
  │  └─ shared flat config presets
  ├─ prettier
  │  └─ shared config + import/Tailwind sorting
  ├─ typescript
  │  └─ shared tsconfig presets
  └─ github
     └─ setup (composite action: pnpm + Node + install)
```

## Prerequisites

- Node.js 24.12.0 (`.nvmrc`)
- pnpm 10.19.0 (see `packageManager` in `package.json`)

## Getting started

```bash
pnpm install
pnpm dev
```

`pnpm dev` runs both apps:

- Web: http://localhost:3000
- Playground: http://localhost:3001

## Common tasks

- Lint: `pnpm lint` - checks code style and common mistakes (ESLint).
- Typecheck: `pnpm typecheck` - runs TypeScript checks across the repo.
- Test: `pnpm test` - runs the test suite (when tests exist).
- Build: `pnpm build` - builds apps and packages for production.
- Format: `pnpm format` - formats files with Prettier.
- Format check: `pnpm format:check` - checks formatting in CI (fails if changes needed).
- Agents check: `pnpm agents:check` - verifies agent configs/skills are in sync.
- Agents sync: `pnpm agents:sync` - syncs shared agent skills/configs to tool-specific folders.

## Recommended VS Code extensions

See `.vscode/extensions.json` for the full list.

- Prettier (`esbenp.prettier-vscode`) - auto-format on save and consistent formatting.
- ESLint (`dbaeumer.vscode-eslint`) - inline lint feedback and auto-fixes.
- Tailwind CSS (`bradlc.vscode-tailwindcss`) - class name autocomplete and linting.
- Claude Code (`Anthropic.claude-code`) - Claude agent workflows inside VS Code.
- Codex (`openai.chatgpt`) - Codex/ChatGPT coding assistance in-editor.
- GitHub Pull Requests (`GitHub.vscode-pull-request-github`) - review PRs and issues without leaving VS Code.

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
