# AGENTS.md — packages/ui

This directory inherits `/AGENTS.md`. This file lists only additions and overrides specific to the UI package.

---

## What This Workspace Is

- **React component library** built with shadcn/ui patterns (New York style)
- Uses **Radix UI primitives** for accessibility and **Tailwind CSS** for styling
- All components are **client components** (no RSC) — designed for use in any React app
- Styled with **class-variance-authority** (cva) for variant management
- Icon library: **lucide-react**
- Base theme: **zinc** with CSS variables

---

## Workspace Commands

| Task          | Command                                        |
| ------------- | ---------------------------------------------- |
| Lint          | `pnpm --filter @turborepo-agents/ui lint`      |
| Format        | `pnpm --filter @turborepo-agents/ui format`    |
| Typecheck     | `pnpm --filter @turborepo-agents/ui typecheck` |
| Add component | `pnpm --filter @turborepo-agents/ui ui-add`    |
| Clean         | `pnpm --filter @turborepo-agents/ui clean`     |

Or run repo-wide via root `pnpm typecheck` / `pnpm lint`.

---

## Local Conventions (Deltas from Root)

### Package Exports (Subpath Pattern)

This package uses **subpath exports** — no barrel file. Consumers import directly:

```typescript
// Components
import { Button } from "@turborepo-agents/ui/components/button";
import { Card, CardHeader, CardTitle } from "@turborepo-agents/ui/components/card";

// Utilities
import { cn } from "@turborepo-agents/ui/lib/utils";

// Styles (in app's CSS)
@import "@turborepo-agents/ui/styles/default.css";
```

### Adding New Components

Use the shadcn CLI to add components:

```bash
pnpm --filter @turborepo-agents/ui ui-add
```

This runs `shadcn@latest add` interactively and auto-formats with Prettier.

### Component Structure

Each component file should follow this pattern:

```typescript
// src/components/example.tsx
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "../lib/utils";

const exampleVariants = cva("base-classes", {
  variants: { ... },
  defaultVariants: { ... },
});

function Example({ className, variant, ...props }: ExampleProps) {
  return <div className={cn(exampleVariants({ variant, className }))} {...props} />;
}

export { Example, exampleVariants };
```

Key conventions:

- **Function components** (not arrow functions assigned to const)
- **Named exports** (not default exports)
- Use `cn()` from `../lib/utils` for class merging
- Export both the component and its variants (when using cva)
- Use `data-slot` attributes for styling hooks

### Directory Structure

```
src/
├── components/     # All UI components (one per file)
├── lib/
│   └── utils.ts    # cn() utility
├── hooks/          # Custom React hooks
└── styles/
    └── default.css # Tailwind theme with CSS variables
```

### Internal Imports

Within this package, use relative imports:

```typescript
import { cn } from "../lib/utils";
```

Do not use the package name for internal imports.

---

## Footguns / Gotchas

1. **No barrel exports** — never create an `index.ts` that re-exports all components. Apps must use subpath imports (`/components/button`, not `/components`).

2. **No app imports** — this package must NOT import from `apps/`. It's a shared dependency, not an app-specific module.

3. **RSC is disabled** — `components.json` sets `rsc: false`. All components are client components by design.

4. **Relative imports internally** — use `../lib/utils`, not `@turborepo-agents/ui/lib/utils` inside this package.

5. **Run `ui-add` not raw shadcn** — the `ui-add` script includes auto-formatting. Running `shadcn add` directly may leave unformatted code.

6. **Clean uses `rm -rf`** — Unix command. On Windows, run via pnpm for cross-platform handling.
