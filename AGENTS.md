# AGENTS.md

Guidelines for AI agents and contributors working in this Turborepo monorepo.

---

## Repo Contract

**What this is:** A Turborepo monorepo starter optimized for agentic coding workflows.

**Non-negotiables:**

- Keep diffs tight and focused — no drive-by refactors
- Never commit secrets, credentials, or .env files
- All code must be public-safe
- Follow existing patterns; don't introduce new tooling without discussion
- **Git is off-limits** — never commit, push, or change branches

---

## Monorepo Structure

### Apps (`apps/`)

| Name       | Filter       | Description                                         |
| ---------- | ------------ | --------------------------------------------------- |
| web        | `web`        | Next.js 16.1.1 application - landing page/demo      |
| playground | `playground` | Vite 7 + React 19 playground app for UI experiments |

### Packages (`packages/`)

| Name | Filter                 | Description                                                 |
| ---- | ---------------------- | ----------------------------------------------------------- |
| ui   | `@turborepo-agents/ui` | React component library (shadcn/ui style, Radix primitives) |

### Tooling (`tooling/`)

| Name       | Filter                         | Description                                                       |
| ---------- | ------------------------------ | ----------------------------------------------------------------- |
| eslint     | `@turborepo-agents/eslint`     | Shared ESLint flat configs (base, react, nextjs)                  |
| prettier   | `@turborepo-agents/prettier`   | Shared Prettier config with import sorting and Tailwind plugins   |
| typescript | `@turborepo-agents/typescript` | Shared TypeScript configs (base, react, nextjs, compiled-package) |
| github     | `@turborepo-agents/github`     | GitHub Actions composite setup action                             |
| agents     | `@turborepo-agents/agents`     | Agent doc sync/check scripts                                      |

---

## Commands

**Prerequisites:**

- Node.js 24.12.0 (see `.nvmrc`)
- pnpm 10.19.0 (see `packageManager` in root `package.json`)

### Install

```bash
pnpm install
```

### Lint

```bash
pnpm lint
```

Runs: `turbo run lint --continue -- --cache --cache-location .cache/.eslintcache`

### Typecheck

```bash
pnpm typecheck
```

Runs: `turbo run typecheck`

### Test

```bash
pnpm test
```

Runs: `turbo run test`

### Build

```bash
pnpm build
```

Runs: `turbo run build`

### Format

```bash
pnpm format                    # Format entire repo
pnpm format:check              # Check formatting (no writes)
pnpm --filter <pkg> format     # Format specific package
```

Uses shared config from `@turborepo-agents/prettier` with plugins:

- `@ianvs/prettier-plugin-sort-imports` - auto-sorts imports
- `prettier-plugin-tailwindcss` - sorts Tailwind classes

Use `pnpm format:check` to verify formatting without modifying files.

### Dev (per app)

```bash
# Web app
pnpm --filter web dev
# Playground app
pnpm --filter playground dev
```

### Clean

```bash
pnpm clean
```

### Agents check

```bash
pnpm agents:check
```

Runs: `turbo run agents:check`

### Agents sync

```bash
pnpm agents:sync
```

Runs: `turbo run agents:sync`

---

## Boundaries

### Import Rules

- **Apps → Packages:** ✅ Apps can import from packages
- **Packages → Apps:** ❌ Packages must NOT import from apps
- **Packages → Packages:** ✅ Allowed (declare as dependency)

### Workspace Dependencies

Use `workspace:*` for internal package references:

```json
{
  "dependencies": {
    "@turborepo-agents/ui": "workspace:*"
  }
}
```

### UI Package Exports

Import UI components using the subpath pattern:

```typescript
import { Button } from "@turborepo-agents/ui/components/button";
import { cn } from "@turborepo-agents/ui/lib/utils";
```

---

## Coding Standards

### TypeScript

- Strict mode enabled (`strict: true`)
- No `any` — use proper types or `unknown`
- Export types explicitly when needed for package consumers
- Use consistent type imports: `import type { Foo } from "./foo"`

### UI Components

- Follow shadcn/ui conventions (New York style)
- Use Radix UI primitives for accessibility
- Style with Tailwind CSS and class-variance-authority
- Icon library: lucide-react

### Adding New UI Components

```bash
pnpm --filter @turborepo-agents/ui ui-add
```

This runs `shadcn@latest add` and auto-formats.

### Next.js (web app)

- Use App Router (`src/app/`)
- Keep landing page fast and lightweight
- Path alias: `~/*` maps to `./src/*`

### Vite (playground app)

- Entry point: `apps/playground/src/main.tsx` renders `Home` from `apps/playground/src/home.tsx`
- Styles: `apps/playground/src/globals.css` already imports Tailwind and the UI theme
- No `~/` alias - use relative imports

---

## CI / Definition of Done

### GitHub Actions Workflows

| Workflow      | Trigger        | Jobs            |
| ------------- | -------------- | --------------- |
| `main.yml`    | Push to `main` | typecheck, lint |
| `feature.yml` | PR to `main`   | typecheck, lint |

### What CI Runs

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
```

### Pre-Push Checklist

Before pushing, run locally:

```bash
pnpm typecheck   # Must pass
pnpm lint        # Must pass
pnpm format      # Recommended
pnpm format:check # Optional (no writes)
```

### Done When

- [ ] `pnpm typecheck` passes with no errors
- [ ] `pnpm lint` passes with no errors
- [ ] No unrelated changes in diff
- [ ] New dependencies added to correct workspace package

---

## Agent Workflow Expectations

### Response Format

When completing tasks, structure your response as:

1. **Plan** — Brief description of what you'll do
2. **Edits** — File-by-file changes with clear descriptions
3. **Review Notes** — Blockers, suggestions, or nits
4. **Validation** — Commands to verify the change

### Git Policy

**Agents must NEVER run git commands that modify state:**

- ❌ `git commit` — no commits
- ❌ `git push` — no pushing
- ❌ `git checkout` / `git switch` — no branch changes
- ❌ `git merge` / `git rebase` — no history modifications
- ✅ `git status`, `git diff`, `git log` — read-only commands are OK

The human controls all git operations.

### Rules for Changes

**Adding dependencies:**

- Add to the correct workspace package, not root (unless truly shared tooling)
- Use `pnpm --filter <package> add <dep>`

**Modifying configs:**

- If changing Turbo pipeline → verify with `pnpm build`
- If changing ESLint/TS configs → run `pnpm lint` and `pnpm typecheck`
- If adding CI jobs → test workflow syntax

**Creating new packages:**

- Add to appropriate directory (`apps/`, `packages/`, or `tooling/`)
- Create `package.json` with correct name pattern
- Add to Turbo pipeline if needed
- Update this file's structure table

### Workspace Filters

```bash
# Apps
pnpm --filter web <command>
pnpm --filter playground <command>

# Packages
pnpm --filter @turborepo-agents/ui <command>

# Tooling
pnpm --filter @turborepo-agents/eslint <command>
pnpm --filter @turborepo-agents/prettier <command>
pnpm --filter @turborepo-agents/typescript <command>
pnpm --filter @turborepo-agents/agents <command>
```

---

## Quick Reference

| Task               | Command                        |
| ------------------ | ------------------------------ |
| Install deps       | `pnpm install`                 |
| Run web dev        | `pnpm --filter web dev`        |
| Run playground dev | `pnpm --filter playground dev` |
| Lint all           | `pnpm lint`                    |
| Typecheck all      | `pnpm typecheck`               |
| Test all           | `pnpm test`                    |
| Build all          | `pnpm build`                   |
| Format code        | `pnpm format`                  |
| Format check       | `pnpm format:check`            |
| Agents check       | `pnpm agents:check`            |
| Agents sync        | `pnpm agents:sync`             |
| Clean all          | `pnpm clean`                   |
