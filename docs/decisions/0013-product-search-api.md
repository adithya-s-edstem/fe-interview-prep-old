# 0013 Product search API

## Status
Accepted

## Context
Q2 needs a public API that searches as the user types (`docs/requirements/live-search.md#data-source`). The brief
suggests DummyJSON product search or GitHub user search. Every pause in typing sends a request, so the API must
tolerate many requests from one browser without a key.

## Decision
Search `https://dummyjson.com/products/search?q=<query>&limit=20&select=title,description`. Results are mapped to a
`Product` type (id, title, description) by the search adapter, which validates the response with Zod. The matching
text is highlighted in both the title and the description, because DummyJSON matches the query in either.

## Alternatives considered
- **GitHub user search:** allows only 10 unauthenticated searches a minute, so a demo of fast typing soon shows
  the error state.
- **DummyJSON without `select`:** returns about 20 fields per product that the page never shows.

## Consequences
- The page depends on dummyjson.com being up; the loading and error states cover it.
- In the browser the request goes to the real API (MSW lets requests outside `/api/*` through,
  `docs/architecture/mock-backend.md#setup`), so it shows in the Network tab. Tests answer it with MSW handlers
  defined in the Q2 tests.
- A response that is not a list of products shows the error state instead of breaking the page.
