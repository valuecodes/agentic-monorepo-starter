# Pull Request Description Generation Instructions

Generate a PR title and description from the diff.

## PR Title (Semantic)

Use Semantic Commit Messages format exactly: `<type>: <subject>`.

### Allowed Types

Only these `<type>` values: chore, docs, feat, fix, refactor, style, test.

### Subject Rules

- Present tense, start with a verb
- Keep it concise (<= 72 chars)
- No trailing period
- Mention the area touched (landing, docs, playground, ui, lint, typecheck, agents) in the subject when helpful

Examples:

- `docs: update turbo commands for docs app`
- `feat: add button variants to ui`
- `chore: align tooling configs across repo`

## PR Description (Required Sections)

Use exactly these headings, in this order:

## What

- 2–6 bullet points describing what changed and why
- Mention affected apps/packages when relevant (apps/landing, apps/docs, apps/playground, packages/ui, tooling/\*)

## How to test

Provide concrete, reproducible steps. Prefer commands like:

- `pnpm turbo lint typecheck`
- `pnpm turbo build`
- `pnpm --filter <app> dev`

Include expected results (what “good” looks like).
If you did not run something, say so and list what should be run.

## Security review

Always include a short checklist-style review. Use this format:

- **Secrets / env vars:** <changed | not changed>. (Never add real secrets to the repo.)
- **Auth / session:** <changed | not changed>.
- **Network / API calls:** <changed | not changed>. (New external calls, endpoints, SSR/CSR fetches, webhooks.)
- **Data handling / PII:** <changed | not changed>. (Logging, analytics, storage, user-provided data.)
- **Dependencies:** <added/updated | not changed>. (Call out any new deps and why; prefer minimal deps.)

If no impact, write exactly:
`No security-impacting changes identified.`
Then add 1–2 bullets justifying, e.g.:

- No new dependencies and no new network calls
- No env var changes and no auth/session logic touched

## Tone

- Keep it concise and high-signal
- Use bullet points
- Do not invent scripts/commands/files that are not in the repo
