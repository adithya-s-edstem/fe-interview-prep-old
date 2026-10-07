# 0005 Vitest and Testing Library

## Status
Accepted

## Context
Every question needs at least one automated test, and Q2 and Q5 need tests about timing and network calls.

## Decision
Vitest with jsdom, React Testing Library and `@testing-library/user-event`. MSW intercepts network calls in tests
(`docs/decisions/0006-msw-mock-backend.md`). Fake timers cover debounce and token expiry.

## Alternatives considered
- **Jest:** works, but needs separate TypeScript and ESM configuration, which Vitest gets from Vite.
- **Playwright or Cypress end-to-end tests:** the strongest proof of Network-tab behaviour, but too slow to set up
  and run within the time limit; they remain a later improvement.

## Consequences
- One config shared with the app build; tests run fast in watch mode.
- Tests assert user-visible behaviour (`docs/architecture/testing.md`), so refactors don't break them.
