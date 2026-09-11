# Copilot instructions (repo-wide)

## Repo contract

- Turborepo monorepo; apps in `apps/*`, shared packages in `packages/*`, shared configs in `tooling/*`.
- Apps may import packages; packages must never import apps.
- Keep diffs focused (no drive-by refactors); do not introduce new tooling without discussion.
- No secrets or `.env*` files; code must be public-safe.
- Git operations are human-only: never commit, push, or change branches.

## Tooling & commands

- Node 24.12.0 (`.nvmrc`), pnpm 11.24.0 (see root `package.json`).
- VS Code Copilot Chat uses `.vscode/settings.json` to load `.github/commit-message-instructions.md` for commit messages and `.github/pull-request-description-instructions.md` for PR descriptions.
- Commands:
  - `pnpm lint` → `oxlint --type-aware --report-unused-disable-directives` (one root process, not a Turbo task; config is the root `.oxlintrc.json`)
  - `pnpm typecheck` → `turbo run typecheck` (TypeScript 7, bare `tsc`)
  - `pnpm test` → `turbo run test`
  - `pnpm build` → `turbo run build`
  - `pnpm format` (Prettier with import sorting & Tailwind plugins)
  - `pnpm format:check` (Prettier check without writes)
- Dev server: `pnpm --filter playground dev`.
- When changing configs/scripts/workflows, update docs accordingly.

## Dependencies

- Shared versions live in the `catalog:` block of `pnpm-workspace.yaml` and are referenced as `catalog:`.
- A dependency with exactly one consumer is pinned inline in that manifest.
- Internal packages use `workspace:*`.
- `minimumReleaseAge` is 14 days, so "latest" means the newest stable release at least that old.

## Code standards

- TypeScript strict (plus `noUncheckedIndexedAccess`); avoid `any`; use explicit types at module boundaries and `import type` where appropriate.
- Use relative imports within a package — `baseUrl`-style bare specifiers are unsupported by tsgolint and break type-aware linting.
- Style with Tailwind CSS 4.
- Keep changes minimal and scoped; add dependencies only when necessary and to the correct workspace package.

## Output expectations (when proposing changes)

- List files touched with brief rationale and include validation commands run or recommended.
