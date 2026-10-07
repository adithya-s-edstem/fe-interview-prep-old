# 0014 Property-based tests with fast-check

## Status
Accepted

## Context
Some rules must hold for any input, not just the examples a test lists. Q2 match highlighting is one: for every
text and query it must keep every character, and treat characters such as `(`, `.` or `*` literally
(`docs/requirements/live-search.md#match-highlighting`). The `style-testing` rule asks for property-based tests
for such invariants.

## Decision
fast-check, as a dev dependency, used inside ordinary Vitest tests with `fc.assert` and `fc.property`.

## Alternatives considered
- **Example tests only:** cover the cases someone thought of, and miss the odd characters that break patterns.
- **Hand-written random inputs:** no shrinking to a minimal failing case, and no reproducible seed.

## Consequences
- Invariant tests run hundreds of generated inputs and report the smallest failing one.
- Dev-only, so nothing ships to the browser.
