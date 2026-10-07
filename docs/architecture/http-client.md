# HTTP client

How features talk to APIs. Core request mechanics are hand-written on `fetch`
(`docs/decisions/0007-hand-written-core-mechanics.md`).

## Fetch wrapper
- A thin wrapper over `fetch` that builds the URL, sends JSON, parses JSON and turns non-2xx responses into typed
  errors carrying the status.
- It accepts an `AbortSignal` so callers can cancel.
- It lives in `src/shared/http/` as `fetchJson`, rejecting with `HttpError` for a non-2xx status.

## API adapters
- One adapter per backend resource (products search, users, auth, orders, admin stats).
- Adapters map server responses into UI-friendly types; components never build URLs or parse responses.
- Adapters validate responses with Zod, so an unexpected shape becomes an error state rather than a crash.
- Q2 product search: `src/features/search/searchProducts.ts` (`docs/decisions/0013-product-search-api.md`).

## Debounced search
For Q2 (`docs/requirements/live-search.md#debounced-requests`):
- A debounced value hook delays the query until the user stops typing for about 300 ms.
- Only the debounced value triggers a request.
- The query is trimmed before the debounce; an empty query skips the debounce so results hide at once.

## Race safety
For Q2 (`docs/requirements/live-search.md#latest-query-wins`):
- Each new request aborts the previous one with an `AbortController`.
- Aborting also happens when the component unmounts, so leaving the page mid-request updates nothing.
- Abort errors are ignored rather than shown as an error state.
- A settled request only updates state if its signal was not aborted. Without this check, clearing the box
  mid-request and retyping the same query would briefly show the cancelled request's abort as an error.
- Each settled result records the query and retry attempt it answers. What the page shows is derived from it:
  a result for any other query or attempt means the current one is still loading.

## Retry
The error state's Retry action re-runs the request for the current query without waiting for the debounce.
Focus moves to the search box, because the Retry button disappears once the request restarts.

## Authenticated requests
Q5 requests go through an authenticated variant of the wrapper that adds the access token and handles expiry.
See [auth-session.md](auth-session.md).
