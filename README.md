# Agentic Monorepo Starter

A Turborepo template for agentic development: strict repo guardrails, consistent tooling,
and clear package boundaries — so agents move fast without turning the codebase into spaghetti.

## What's inside

- Vite playground in `apps/playground` (Vite 8, React 19, Tailwind CSS 4)
- Shared tooling: oxlint, oxfmt, Knip, TypeScript 7, Turbo
- `@repo/logger` — structured JSON logging for Cloud Run / Cloud Logging
- pnpm catalog for versions, with supply-chain guards: a 14-day release-age wait,
  a trust-downgrade check, and no git/tarball subdependencies
- Claude Code settings in `.claude/`

```text
apps/playground        Vite 8 + React 19 sandbox
packages/logger        pino logger, Cloud Logging shaped JSON
packages/typescript    shared tsconfig presets (base, node, react)
.github/               CI workflow, composite setup action, secrets-scan script
.oxlintrc.json         single root lint config for the whole repo
.oxfmtrc.jsonc         single root format config for the whole repo
```

## Getting started

Requires Node.js 24 (exact version in `.nvmrc`) and pnpm 12.10.1 (`packageManager` in `package.json`).

```bash
pnpm install
pnpm dev          # playground at http://localhost:3000
```

## Commands

```bash
pnpm lint           # type-aware linting, whole repo in one oxlint process
pnpm knip           # unused files, exports and dependencies
pnpm typecheck      # TypeScript 7 (tsc) across the repo
pnpm test           # test suite
pnpm build          # production builds
pnpm format         # oxfmt write
pnpm format:check   # oxfmt check (CI gate)
pnpm secrets:scan   # gitleaks secret scan over git history
```

oxlint prints nothing when there are no findings, so silent output means clean.

CI runs typecheck, lint, knip, format:check, test, build and a gitleaks secret scan on
PRs and on push to `main`, plus CodeQL code scanning. The `all-passed` job fans them in:
require only that check in branch protection (the former `format-check` check is now
`format:check`). `secrets:scan` needs either `gitleaks` v8.19+ on PATH or a running
Docker daemon.

## Use this template

Use GitHub's **Use this template** button, then go through the new repo's settings:

1. **Rules → Rulesets**: add a ruleset for `main` that requires a pull request and
   the `all-passed` status check. That one check fans in every CI job, so it is the
   only one to list.
2. **Code security → Code scanning**: turn _default setup_ **off**. CodeQL runs from
   `ci.yml` (free on public repos; private repos need GitHub Code Security), and
   GitHub rejects its uploads while default setup is on.
3. **Code security → Dependabot**: turn **alerts** on and leave **security updates**
   off. You get notified about vulnerable dependencies without automatic PRs;
   `.github/dependabot.yml` only bumps the SHA-pinned GitHub Actions monthly, and npm
   dependencies are updated by hand.
4. **Actions → General**: turn on _Allow GitHub Actions to create and approve pull
   requests_, so the daily `Node.js update` workflow can open a PR when a newer
   Node.js release is out on the `.nvmrc` major. Its first PR needs **Approve
   workflows to run** before CI starts.

No environments are needed. Create one only when you enable the commented-out `deploy`
job in `ci.yml`, with a deployment-branch rule allowing `main` only.
