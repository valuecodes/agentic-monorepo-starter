# AGENTS.md — apps/web

This directory inherits `/AGENTS.md`. This file lists only additions and overrides specific to the web app.

---

## What This Workspace Is

- **Next.js 16.1.1** landing page / demo application using React 19
- Uses **App Router** (`src/app/`) — no Pages Router
- Styled with **Tailwind CSS 4.x** and `@turborepo-agents/ui` components
- Fonts: Geist Sans and Geist Mono via `next/font/google`
- Landing page focus: keep it fast and lightweight

---

## Workspace Commands

| Task      | Command                       |
| --------- | ----------------------------- |
| Dev       | `pnpm --filter web dev`       |
| Build     | `pnpm --filter web build`     |
| Start     | `pnpm --filter web start`     |
| Typecheck | `pnpm --filter web typecheck` |
| Lint      | `pnpm --filter web lint`      |
| Format    | `pnpm --filter web format`    |
| Clean     | `pnpm --filter web clean`     |

Or run repo-wide via root `pnpm typecheck` / `pnpm lint` / `pnpm build`.

---

## Local Conventions (Deltas from Root)

### Path Alias

- `~/*` maps to `./src/*` — use for local imports:
  ```typescript
  import { MyComponent } from "~/components/my-component";
  ```

### UI Package Imports

Import components using subpath exports (not barrel imports):

```typescript
import { Button } from "@turborepo-agents/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
} from "@turborepo-agents/ui/components/card";
import { cn } from "@turborepo-agents/ui/lib/utils";
```

### CSS Setup

`src/app/globals.css` already imports:

- Tailwind base: `@import "tailwindcss";`
- UI theme: `@import "@turborepo-agents/ui/styles/default.css";`
- Source paths for Tailwind to scan both local and UI package files

Do not duplicate these imports in other CSS files.

### App Router Patterns

- All routes live in `src/app/`
- Use `page.tsx` for routes, `layout.tsx` for shared layouts
- Default export for pages: `export default function PageName()` or `const PageName = () => {}; export default PageName;`
- Metadata via `export const metadata: Metadata = { ... }`

### Server vs Client Components

- Default is Server Component (no directive needed)
- Add `"use client";` at top of file only when you need:
  - React hooks (`useState`, `useEffect`, etc.)
  - Browser APIs
  - Event handlers (`onClick`, `onChange`, etc.)

---

## Footguns / Gotchas

1. **Don't import from `@turborepo-agents/ui` barrel** — always use subpath imports (e.g., `/components/button`), otherwise bundling breaks.

2. **TypeScript build errors are ignored** — `next.config.ts` sets `ignoreBuildErrors: true` because CI runs typecheck separately. Always run `pnpm --filter web typecheck` before pushing.

3. **Tailwind content scanning** — if you add new component directories, ensure they're covered by `@source` directives in `globals.css`.

4. **`transpilePackages`** — `@turborepo-agents/ui` is transpiled by Next.js. If you add another workspace dependency, add it to `next.config.ts`.

5. **Clean command uses `rm -rf`** — runs on Unix. On Windows, use `pnpm --filter web clean` through pnpm which handles cross-platform execution.

6. **Fonts** — Geist fonts are loaded in `layout.tsx`. Don't re-import or duplicate font loading in nested layouts.
