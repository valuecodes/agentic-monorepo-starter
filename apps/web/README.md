# Web App

Next.js 16 application with App Router, part of the agentic-monorepo-starter template.

## Getting Started

From the repository root:

```bash
pnpm --filter web dev
```

Or run all apps together:

```bash
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Structure

```
src/
├── app/          # App Router pages and layouts
└── ...
```

## Path Alias

Use `~/*` to import from `./src/*`:

```typescript
import { something } from "~/components/something";
```

## UI Components

Import shared components from `@repo/ui`:

```typescript
import { Button } from "@repo/ui/components/button";
```

## More Information

See the [root README](../../README.md) for full documentation.
