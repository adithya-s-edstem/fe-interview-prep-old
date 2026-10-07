# 0011 One ticket per question

## Status
Accepted

## Context
The project workflow is one GitHub issue, one branch and one PR per ticket. The assignment requires exactly one
branch, PR and merge per question, with fixed branch names, merged in order.

## Decision
- One ticket per question, Q1 to Q5, each using the assignment's branch name (`docs/requirements/delivery.md#branches`)
  instead of the project's usual naming.
- App setup (Vite, lint, test runner, routes shell, Tailwind, MSW wiring, README) is a separate chore ticket merged
  into `main` before Q1.
- Each question's ticket is split into acceptance criteria, not into further tickets, because the assignment does
  not allow extra PRs per question.

## Alternatives considered
- **Several tickets per question:** smaller PRs, but breaks the assignment's one-PR-per-question rule.

## Consequences
- Question PRs are larger than the project's usual PR size; commits within them must be small and meaningful
  (`docs/requirements/delivery.md#commits`).
