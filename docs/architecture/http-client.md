# HTTP client

How features talk to APIs. Core request mechanics are hand-written on `fetch`
(`docs/decisions/0007-hand-written-core-mechanics.md`).

## Fetch wrapper
- A thin wrapper over `fetch` that builds the URL, sends JSON, parses JSON and turns non-2xx responses into typed
  errors carrying the status.
- It accepts an `AbortSignal` so callers can cancel.

## API adapters
- One adapter per backend resource (products search, users, auth, orders, admin stats).
- Adapters map server responses into UI-friendly types; components never build URLs or parse responses.

## Debounced search
For Q2 (`docs/requirements/live-search.md#debounced-requests`):
- A debounced value hook delays the query until the user stops typing for about 300 ms.
- Only the debounced value triggers a request.

## Race safety
For Q2 (`docs/requirements/live-search.md#latest-query-wins`):
- Each new request aborts the previous one with an `AbortController`.
- Aborting also happens when the component unmounts, so leaving the page mid-request updates nothing.
- Abort errors are ignored rather than shown as an error state.

## Retry
The error state's Retry action re-runs the request for the current query without waiting for the debounce.

## Authenticated requests
Q5 requests go through an authenticated variant of the wrapper that adds the access token and handles expiry.
See [auth-session.md](auth-session.md).
