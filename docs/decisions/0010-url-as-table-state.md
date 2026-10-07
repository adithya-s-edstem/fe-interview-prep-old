# 0010 URL as the table's view state

## Status
Accepted

## Context
Q4 requires the view (sort, search, filters, page) to be shareable as a link and to work with back and forward.

## Decision
The URL search params are the only store of the view. The page derives the view from the URL on every render and
writes changes back with the router (`docs/architecture/url-state.md`).

## Alternatives considered
- **Component state synced to the URL with effects:** two sources of truth that can drift, and back/forward needs
  extra syncing code.
- **A global store (Zustand, Redux) with a URL middleware:** more moving parts for the same result.

## Consequences
- Shared links, reloads and back/forward all work from one rule: render what the URL says.
- Every URL change re-renders the page, so the pipeline result is memoised.
- Invalid URLs must be handled by parsing with defaults.
