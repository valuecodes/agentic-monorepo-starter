# Playground

Vite + React playground for experimenting with UI and agent workflows in this monorepo.

## Stack

- Vite 7 + React 19
- Tailwind CSS 4 with `@turborepo-agents/ui` theme
- Vitest for unit tests

## Getting started

From the repo root:

```bash
pnpm install
pnpm --filter playground dev
```

Open http://localhost:5173 to view the app.

## Common commands

| Task      | Command                              |
| --------- | ------------------------------------ |
| Dev       | `pnpm --filter playground dev`       |
| Build     | `pnpm --filter playground build`     |
| Preview   | `pnpm --filter playground preview`   |
| Typecheck | `pnpm --filter playground typecheck` |
| Lint      | `pnpm --filter playground lint`      |
| Test      | `pnpm --filter playground test`      |
| Format    | `pnpm --filter playground format`    |
| Clean     | `pnpm --filter playground clean`     |

## UI imports

Use subpath exports from the UI package:

```ts
import { Button } from "@turborepo-agents/ui/components/button";
import { cn } from "@turborepo-agents/ui/lib/utils";
```
