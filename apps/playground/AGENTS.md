# AGENTS.md - apps/playground

This directory inherits `/AGENTS.md`. This file lists only additions and overrides specific to the playground app.

---

## What This Workspace Is

- Vite 7 + React 19 playground for fast UI experiments.
- Tailwind CSS 4 with shared `@repo/ui` components and theme.
- Single-page app rendered from `src/home.tsx`.

---

## Workspace Commands

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

Or run repo-wide via root `pnpm typecheck` / `pnpm lint` / `pnpm test` / `pnpm build`.

---

## Local Conventions (Deltas from Root)

### Entry Point

- `src/main.tsx` mounts the app and renders `Home` from `src/home.tsx`.

### Styling

- `src/globals.css` already imports Tailwind and the UI theme.
- Tailwind source scanning uses `@source` directives for local and UI package files.

### UI Package Imports

Import UI components using subpath exports:

```ts
import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";
```

### Vite Notes

- No Next.js routing or `~/` alias; use relative imports.

---

## Footguns / Gotchas

1. **Clean uses `rm -rf`** - Unix command. On Windows, run via pnpm for cross-platform handling.
2. **Tests run once** - `pnpm --filter playground test` uses `vitest run` (no watch mode).
3. **Typecheck is separate** - run `pnpm --filter playground typecheck` to catch TS errors early.
4. **Tailwind scanning** - if you add new directories, update `@source` entries in `src/globals.css`.
