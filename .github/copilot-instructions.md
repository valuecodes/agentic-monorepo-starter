# Copilot instructions (repo-wide)

## Repo contract

- Turborepo monorepo; apps in `apps/*`, shared packages in `packages/*`.
- Apps may import packages; packages must never import apps.
- Keep diffs focused (no drive-by refactors); do not introduce new tooling without discussion.
- No secrets or `.env*` files; code must be public-safe.
- Git operations are human-only: never commit, push, or change branches.

## Tooling & commands

- Node 24.12.0 (`.nvmrc`), pnpm 10.19.0 (see root `package.json`).
- Prefer Turbo tasks via pnpm:
  - `pnpm lint` → `turbo run lint --continue -- --cache --cache-location .cache/.eslintcache`
  - `pnpm typecheck` → `turbo run typecheck`
  - `pnpm build` → `turbo run build`
  - `pnpm format` (Prettier with import sorting & Tailwind plugins)
- Dev server per app: `pnpm --filter web dev`.
- When changing configs/scripts/workflows, update docs accordingly.

## Code standards

- TypeScript strict; avoid `any`; use explicit types at module boundaries and `import type` where appropriate.
- UI follows shadcn/Radix conventions; style with Tailwind; lucide-react icons.
- Next.js app router under `src/app`; path alias `~/*` → `./src/*`.
- For UI package imports use subpaths, e.g. `@turborepo-agents/ui/components/button` and `@turborepo-agents/ui/lib/utils`.
- Keep changes minimal and scoped; add dependencies only when necessary and to the correct workspace package.

## Output expectations (when proposing changes)

- List files touched with brief rationale and include validation commands run or recommended.
