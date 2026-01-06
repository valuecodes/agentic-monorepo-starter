# Copilot instructions (repo-wide)

## Repo contract

- Turborepo monorepo; apps in `apps/*`, shared packages in `packages/*`.
- Apps may import packages; packages must never import apps.
- Keep diffs focused (no drive-by refactors); do not introduce new tooling without discussion.
- No secrets or `.env*` files; code must be public-safe.
- Git operations are human-only: never commit, push, or change branches.

## Tooling & commands

- Node 24.12.0 (`.nvmrc`), pnpm 10.19.0 (see root `package.json`).
- VS Code Copilot Chat uses `.vscode/settings.json` to load `.github/commit-message-instructions.md` for commit messages and `.github/pull-request-description-instructions.md` for PR descriptions.
- Prefer Turbo tasks via pnpm:
  - `pnpm lint` → `turbo run lint --continue -- --cache --cache-location .cache/.eslintcache`
  - `pnpm typecheck` → `turbo run typecheck`
  - `pnpm test` → `turbo run test`
  - `pnpm agents:check` → `turbo run agents:check`
  - `pnpm agents:sync` → `turbo run agents:sync`
  - `pnpm build` → `turbo run build`
  - `pnpm format` (Prettier with import sorting & Tailwind plugins)
  - `pnpm format:check` (Prettier check without writes)
- Dev server per app: `pnpm --filter web dev` or `pnpm --filter playground dev`.
- When changing configs/scripts/workflows, update docs accordingly.

## Code standards

- TypeScript strict; avoid `any`; use explicit types at module boundaries and `import type` where appropriate.
- UI follows shadcn/Radix conventions; style with Tailwind; lucide-react icons.
- Next.js app router under `src/app`; path alias `~/*` → `./src/*`.
- For UI package imports use subpaths, e.g. `@repo/ui/components/button` and `@repo/ui/lib/utils`.
- Keep changes minimal and scoped; add dependencies only when necessary and to the correct workspace package.

## Output expectations (when proposing changes)

- List files touched with brief rationale and include validation commands run or recommended.
