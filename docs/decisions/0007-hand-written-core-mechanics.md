# 0007 Hand-write the core mechanics

## Status
Accepted

## Context
The assignment forbids a UI or table library that does a question's core work, and says the interview will probe
re-renders, race conditions and choices. The project rule (`style-plugins-first`) prefers libraries for complex
functionality. The two rules meet at the line between a question's core and everything around it.

## Decision
Hand-write the mechanisms each question exists to test, on top of `fetch` and React:
- Q2: debounce, cancelling stale requests with `AbortController`, and the four result states.
- Q4: the generic table, sorting, filtering, search and pagination pipeline.
- Q5: attaching tokens, retrying after a `401`, and the single-flight refresh promise.

Use established libraries for everything else: routing (0002), forms and validation (0003), styling (0004),
testing (0005) and mocking (0006).

## Alternatives considered
- **TanStack Query for Q2:** cancels and caches by query key, so it does the "latest query wins" work for us.
- **TanStack Table for Q4:** explicitly forbidden ("don't use a table library").
- **Axios interceptors or `ky` hooks for Q5:** still need hand-written single-flight logic, and add a dependency
  for little gain over `fetch`.

## Consequences
- More code to write and test, but each piece is small and can be explained line by line.
- Caching repeated Q2 queries (a stretch goal) must be written by hand if attempted.
