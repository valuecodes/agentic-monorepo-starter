# Commit Message Generation Instructions

Use Semantic Commit Messages format exactly: `<type>: <subject>`.

## Allowed Types

Only these `<type>` values: chore, docs, feat, fix, refactor, style, test.

## Subject Rules

- Present tense, start with a verb
- Keep it concise (<= 72 chars)
- No trailing period

## Monorepo Context

Mention the area touched (landing, docs, playground, ui, lint, typecheck, agents) in the subject when helpful.

Examples:

- `docs: update turbo commands for docs app`
- `feat: add button variants to ui`

If changes span multiple areas, prefer a higher-level subject (e.g., `chore: align tooling configs across repo`) instead of listing everything.

## Body (if needed)

Keep it short: 1-3 bullet points describing what changed, no extra fluff.
