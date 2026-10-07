# Testing

Tools: Vitest, React Testing Library, user-event and MSW (`docs/decisions/0005-vitest-testing-library.md`).

## Approach
- Tests drive the UI the way a user does (roles, labels, typing, clicking) and assert what the user sees.
- Network calls are intercepted with the same MSW handlers the app uses in development. Public APIs the browser
  calls directly (Q2 product search) are answered by handlers each test sets up.
- Pure logic (the table pipeline, the postal code rule, URL parsing) is also tested directly.
- Fake timers are used for debounce and token expiry instead of real waiting. Only `setTimeout` and
  `clearTimeout` are faked. Testing Library only detects Jest's fake timers, so the test setup gives it a `jest`
  global that advances Vitest's; without it, every user-event call waits forever.
- Invariants over wide input ranges use property-based tests with fast-check
  (`docs/decisions/0014-property-based-tests.md`).

## Required proofs
Each question has at least one test, and the key acceptance criterion has a test that proves it:

| Question | Test proves |
|---|---|
| Q1 | Todos and the filter are restored after remount from storage; whitespace titles are ignored |
| Q2 | Typing "react" quickly sends one request; a late response for an old query does not replace newer results |
| Q3 | An invalid step blocks Next and shows errors; India requires a 6-digit postal code |
| Q4 | A URL with sort, search, filter and page renders that exact view; changing a filter resets to page 1 |
| Q5 | Three parallel requests after expiry cause exactly one refresh call and all three succeed |

## Quality gates
Before every PR, and in CI:
- `npm run lint` — ESLint, no warnings.
- `npm run typecheck` — `tsc --noEmit` in strict mode.
- `npm test` — Vitest run.
- `scripts/check-limits.sh` — line and file length limits.
