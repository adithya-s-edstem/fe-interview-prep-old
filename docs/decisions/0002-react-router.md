# 0002 React Router

## Status
Accepted

## Context
Each question needs its own route. Q4 keeps the view in the URL with back/forward support, and Q5 needs protected
routes that redirect to login and back.

## Decision
Use React Router in declarative mode: `<Routes>` with nested routes, `useSearchParams` for Q4, and wrapper
components with `<Navigate>` and location state for Q5 guards.

## Alternatives considered
- **TanStack Router:** typed search params are attractive for Q4, but the API is larger and less familiar.
- **Hand-written routing on the History API:** adds code that no question asks for.
- **Wouter:** small, but has no built-in search-param or redirect-state helpers.

## Consequences
- Search params and redirect state come from a widely known API.
- Search params are untyped strings, so Q4 parses them with a schema (`docs/architecture/url-state.md`).
