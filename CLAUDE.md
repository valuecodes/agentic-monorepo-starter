# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

Turborepo monorepo starter optimized for agentic coding workflows with Next.js 16, shadcn/ui components, and shared tooling.

**Prerequisites:**

- Node.js 24.12.0 (see `.nvmrc`)
- pnpm 10.19.0 (see `packageManager` in root `package.json`)

## Workspace Structure

This is a Turborepo monorepo with three workspace categories:

- **`apps/`** - Applications (web: Next.js 16.1.1 with App Router)
- **`packages/`** - Shared libraries (ui: shadcn/ui component library with Radix primitives)
- **`tooling/`** - Shared development configs (eslint, prettier, typescript, github)

Workspace dependencies use the `workspace:*` protocol. All packages use the `@turborepo-agents/` scope.

## Common Commands

```bash
# Development
pnpm install                    # Install all dependencies
pnpm --filter web dev           # Run Next.js dev server

# Quality checks (run before pushing)
pnpm typecheck                  # Type check all workspaces
pnpm lint                       # Lint with ESLint (uses Turbo cache)
pnpm build                      # Build all workspaces
pnpm format                     # Format with Prettier

# Package-specific commands
pnpm --filter <pkg> <command>   # Run command in specific workspace
pnpm --filter @turborepo-agents/ui ui-add  # Add shadcn component

# Cleanup
pnpm clean                      # Remove build artifacts and node_modules
```

**Workspace filters:**

- Apps: `web`
- Packages: `@turborepo-agents/ui`
- Tooling: `@turborepo-agents/eslint`, `@turborepo-agents/prettier`, `@turborepo-agents/typescript`, `@turborepo-agents/github`

## Architecture

### Turbo Pipeline

Defined in `turbo.json`:

- **build**: Depends on `prebuild` and `^build` (upstream builds), outputs to `dist/**`
- **typecheck**: Depends on `^typecheck`
- **lint**: Depends on `^build`, caches to `.cache/.eslintcache`
- **dev**: Persistent task (not cached), depends on `^dev`
- **format/clean**: Standard cleanup tasks

### Import Boundaries

- Apps can import from packages ✅
- Packages CANNOT import from apps ❌
- Packages can import from other packages ✅ (declare as dependency)

### UI Package Exports

The `@turborepo-agents/ui` package uses subpath exports:

```typescript
import { Button } from "@turborepo-agents/ui/components/button";
import { cn } from "@turborepo-agents/ui/lib/utils";
```

Export paths: `./components/*`, `./lib/*`, `./styles/*`, `./postcss-config`

### Next.js Configuration (web app)

- Uses App Router (`src/app/`)
- Path alias: `~/*` → `./src/*`
- Tailwind CSS 4.x with PostCSS
- Component library: `@turborepo-agents/ui`

### UI Component Standards

- Based on shadcn/ui (New York style)
- Radix UI primitives for accessibility
- Styling: Tailwind CSS + class-variance-authority (`cva`)
- Icons: lucide-react
- Form handling: react-hook-form + zod
- Add components: `pnpm --filter @turborepo-agents/ui ui-add`

### Shared Tooling

**ESLint** (`@turborepo-agents/eslint`):

- Flat config format
- Exports: `./base`, `./react`, `./nextjs`
- Plugins: typescript-eslint, turbo, react, jsx-a11y, import, next

**Prettier** (`@turborepo-agents/prettier`):

- Auto-sorts imports (`@ianvs/prettier-plugin-sort-imports`)
- Auto-sorts Tailwind classes (`prettier-plugin-tailwindcss`)

**TypeScript** (`@turborepo-agents/typescript`):

- Strict mode enabled
- Exports: `./base`, `./react`, `./nextjs`, `./compiled-package`

## Claude Code Hooks

**Post-Edit Formatting**: After `Edit` or `Write` operations, Claude runs the configured hook from `.claude/settings.json`, which executes `pnpm format-changed-files` (backed by `scripts/format-changed-files.ts`) to run Prettier on modified files (ts, tsx, js, jsx, mjs, cjs, json, md, mdx, yaml, yml).

**Permissions** (`.claude/settings.json`):

- Auto-approved: lint, typecheck, build, format, `pnpm --filter` commands
- Requires confirmation: install, add, remove dependencies, git commit
- Denied: curl, wget, nc, ssh, reading .env files, git push, gh pr create

## CI/CD

### GitHub Actions

Two workflows in `.github/workflows/`:

- **main.yml**: Runs on push to `main` (typecheck + lint)
- **feature.yml**: Runs on PR to `main` (typecheck + lint)

Both use the composite action at `./tooling/github/setup` for Node.js + pnpm setup.

### Definition of Done

Before pushing, ensure:

- `pnpm typecheck` passes ✅
- `pnpm lint` passes ✅
- No unrelated changes in diff ✅
- Dependencies added to correct workspace package ✅

## Repository Rules

### Code Changes

- Keep diffs focused - no drive-by refactors
- Follow existing patterns - don't introduce new tooling without discussion
- Use strict TypeScript - no `any` types (use `unknown` if needed)
- Add dependencies to the correct workspace using `pnpm --filter <pkg> add <dep>`

### Git Policy for Agents

**NEVER run git commands that modify state:**

- ❌ `git commit`, `git push`, `git checkout`, `git switch`, `git merge`, `git rebase`
- ✅ `git status`, `git diff`, `git log` (read-only commands are OK)

The human controls all git operations.

### Security

- Never commit secrets, credentials, or .env files
- All code must be public-safe
- Hooks deny reading .env files and secrets directories

## Adding New Workspaces

1. Create in appropriate directory (`apps/`, `packages/`, or `tooling/`)
2. Add `package.json` with correct name pattern (`@turborepo-agents/<name>`)
3. Add to Turbo pipeline in `turbo.json` if needed
4. Update AGENTS.md structure table
5. For tooling packages, add export paths for configs
