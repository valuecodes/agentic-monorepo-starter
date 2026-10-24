# AGENTS.md

Guidelines for AI agents and contributors working in this Turborepo monorepo.

`CLAUDE.md` is a symlink to this file. Never edit `CLAUDE.md` directly.

---

## Structure

### Apps (`apps/`)

| Name       | Filter       | Description                                                     |
| ---------- | ------------ | --------------------------------------------------------------- |
| playground | `playground` | Vite 8 + React 19 app for experiments, deployable to Cloudflare |

### Packages (`packages/`)

| Name   | Filter         | Description                                    |
| ------ | -------------- | ---------------------------------------------- |
| logger | `@repo/logger` | pino logger emitting Cloud Logging shaped JSON |

### Tooling (`tooling/`)

| Name       | Filter             | Description                                                      |
| ---------- | ------------------ | ---------------------------------------------------------------- |
| typescript | `@repo/typescript` | Shared tsconfig presets (`base.json`, `node.json`, `react.json`) |
| github     | `@repo/github`     | GitHub Actions composite setup action, gitleaks `secrets-scan`   |

Apps may import packages; packages must never import apps. oxlint bans `../`
imports and deep `@repo/*/src` imports: import other workspaces by package name,
and inside an app use the `~/` alias (`src/*`) to go up the tree.

---

## Commands

**Prerequisites:** Node.js 24 (exact version in `.nvmrc`), pnpm 12.10.1 (`packageManager` in root `package.json`).

```bash
pnpm install                     # Install all dependencies
pnpm --filter playground dev     # Vite dev server (port 3000)

pnpm lint                        # oxlint, one process over the whole repo
pnpm knip                        # unused files, exports and dependencies
pnpm typecheck                   # turbo run typecheck
pnpm test                        # turbo run test
pnpm build                       # turbo run build
pnpm format                      # oxfmt, writes in place
pnpm format:check                # oxfmt --check (no writes)
pnpm secrets:scan                # gitleaks over the full git history
pnpm clean                       # turbo run clean
```

`lint` and `knip` do not go through Turbo — each is a single process over the whole
repo. oxlint is configured by the root `.oxlintrc.json` (including `import/no-cycle`)
and prints nothing when there are no findings, so silent output means clean. Knip is
configured by the root `knip.jsonc` and exits 0 when clean. Formatting is oxfmt
(Prettier-compatible), configured by the root `.oxfmtrc.jsonc`, which also sorts
imports and Tailwind classes.

There is no post-edit formatting hook: run `pnpm format` yourself before committing.

`secrets:scan` runs gitleaks (`tooling/github/scripts/secrets-scan.sh`, version pinned
there) using a local `gitleaks` v8.19+ if one is on PATH, otherwise the pinned Docker image.
It exits 0 when clean and 1 when it finds a leak.

CI (`.github/workflows/`) runs typecheck, lint, knip, format-check, test, build,
secrets-scan and CodeQL code scanning (`javascript-typescript` and `actions`) on push
to `main` and on PRs.

Dependabot (`.github/dependabot.yml`) bumps the SHA-pinned actions monthly in one grouped
PR (the branch-pinned `valuecodes/automation` workflow gets its own); npm dependencies are
updated by hand.

`node-update.yml` calls the reusable workflow from `valuecodes/automation` (pinned to a
commit SHA) daily: when a newer Node.js release is out on the `.nvmrc` major, it opens a
`chore: bump Node.js to …` PR. Security releases open one right away; others wait 14
days. Its PRs start CI only after someone clicks **Approve workflows to run** (if no
runs show up, close and reopen the PR). Keep the exact Node version only in `.nvmrc`,
so that PR is the whole bump; the Cloudflare `NODE_VERSION` build variable is the one
pin to update by hand. A newer release closes the older PR and deletes its branch, so
push any follow-up commits just before merging.

---

## Rules

- Keep diffs tight and focused; no drive-by refactors or new tooling without discussion.
- Never commit secrets, credentials, or `.env` files. All code must be public-safe.
- Add dependencies to the correct workspace with `pnpm --filter <package> add <dep>`.
  Every external version lives in the `catalog:` block of `pnpm-workspace.yaml`
  and manifests reference it as `catalog:`; `@repo/*` deps stay `workspace:*`.
  Update with `pnpm up --latest -r`; `updateConfig.ignoreDependencies` holds
  `@types/node` to the `.nvmrc` major, so bump it by hand.
- Every install enforces the supply-chain settings in `pnpm-workspace.yaml`
  (`minimumReleaseAge`, `trustPolicy: no-downgrade`) plus pnpm 12's default
  `blockExoticSubdeps`. When one fails, investigate: never disable it, and never
  exclude a whole package to get past it.
