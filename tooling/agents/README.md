# @turborepo-agents/agents

Purpose: manage the multi-agent setup in the monorepo by keeping agent docs and configs consistent and formatting changed files.

## What lives here

- `scripts/agents-check.ts`: validates agent docs/config consistency.
- `scripts/agents-sync.ts`: syncs agent docs/config across the repo.
- `scripts/format-changed-files.ts`: formats touched files based on `agents.config.ts`.
- `agents.config.ts`: configuration for agent tooling behavior.

## Common commands

Run these from the repo root:

```bash
pnpm agents:check
pnpm agents:sync
pnpm --filter @turborepo-agents/agents format-changed-files
```
