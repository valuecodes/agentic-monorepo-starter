# Agentic Monorepo Starter

Monorepo template for agent-assisted development: reusable packages, strict TypeScript, CI
checks, and agent workflows.

## What's inside

- Vite playground in `apps/playground` (Vite 8, React 19, Tailwind CSS 4)
- Shared tooling: oxlint, oxfmt, Knip, TypeScript 7, Turbo
- `@repo/logger` — structured JSON logging for Cloud Run / Cloud Logging
- pnpm catalog for versions, with supply-chain guards: a 14-day release-age wait,
  a trust-downgrade check, and no git/tarball subdependencies
- Git hooks in `.githooks/`: format, lint and a staged secrets scan before each
  commit; typecheck, test and Knip before each push
- Claude Code settings in `.claude/`

```text
apps/playground        Vite 8 + React 19 sandbox
packages/logger        pino logger, Cloud Logging shaped JSON
packages/typescript    shared tsconfig presets (base, node, react)
.github/               CI workflows, composite setup action
.githooks/             pre-commit and pre-push hooks
.oxlintrc.json         single root lint config for the whole repo
.oxfmtrc.jsonc         single root format config for the whole repo
```

## Getting started

Requires Node.js 26 (exact version in `.nvmrc`) and pnpm 12 (exact version in `packageManager` in `package.json`).
Node.js 26 no longer bundles Corepack, so install it once with `npm install -g corepack && corepack enable`.

```bash
pnpm install
pnpm dev          # playground at http://localhost:3000
```

`pnpm install` also turns on the git hooks. Committing needs `gitleaks` v8.19+ on PATH
for the staged secrets scan: `brew install gitleaks` (macOS, Linux and WSL), or unpack the
`linux_x64` tarball from the [releases page](https://github.com/gitleaks/gitleaks/releases)
into a directory on PATH such as `~/.local/bin`.

## Commands

```bash
pnpm lint           # type-aware linting, whole repo in one oxlint process
pnpm knip           # unused files, exports and dependencies
pnpm typecheck      # TypeScript 7 (tsc) across the repo
pnpm test           # test suite
pnpm build          # production builds
pnpm format         # oxfmt write
pnpm format:check   # oxfmt check (CI gate)
```

oxlint prints nothing when there are no findings, so silent output means clean.

CI runs typecheck, lint, knip, format:check, test, build and a gitleaks secret scan on
PRs and on push to `main`, plus CodeQL code scanning and actionlint + zizmor over the
workflow files. The checks live once in `checks.yml`, called by `feature.yml` (PRs) and
`main.yml` (push to `main`). The `all-passed` job fans them in:
require only that check in branch protection.

## Use this template

Use GitHub's **Use this template** button, then go through the new repo's settings:

1. **Rules → Rulesets**: add a ruleset for `main` that requires a pull request and
   the `all-passed` status check. That one check fans in every CI job, so it is the
   only one to list.
2. **Code security → Code scanning**: turn _default setup_ **off**. CodeQL runs from
   `checks.yml` (free on public repos; private repos need GitHub Code Security), and
   GitHub rejects its uploads while default setup is on.
3. **Code security → Dependabot**: turn **alerts** on and leave **security updates**
   off. You get notified about vulnerable dependencies without automatic PRs;
   `.github/dependabot.yml` only bumps the SHA-pinned GitHub Actions monthly, and npm
   dependencies are updated by hand.
4. **Issues**: run the `Maintain-kit dashboard` workflow once (**Actions → Maintain-kit
   dashboard → Run workflow**), then pin the **Maintenance dashboard** issue it
   creates so it stays at the top of the issue list.

No environments are needed. Create one only when you enable the commented-out `deploy`
job in `main.yml`, with a deployment-branch rule allowing `main` only.
