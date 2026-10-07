# Q2 — Live Search

A search box that shows results from a public API as the user types. Route: `/search`. Branch: `feature/q2-search`.

## Data source
- A public API, for example `https://dummyjson.com/products/search?q=` or GitHub user search.
- Chosen: DummyJSON product search, showing each product's title and description
  (`docs/decisions/0013-product-search-api.md`).

## Debounced requests
- No request is sent on every keystroke; a request is sent only once the user briefly stops typing.
- An empty or whitespace-only query sends no request and shows no results.
- Clearing the box hides the results at once, without waiting for the pause.
- The query is sent without its surrounding spaces.

## Latest query wins
- The results on screen always match the latest query, even when an earlier response arrives late.
- Leaving the page mid-request causes no state update or error after the page is gone.

## Result states
- **Loading:** shown while the request for the current query is in flight.
- **Error:** shown when the request fails, with a Retry action that repeats the same query.
- **Empty:** shown when the API returns no matches, with the text `No results for 'xyz'`.
- **Results:** the list of matches for the current query.

## Match highlighting
- The text matching the query is highlighted inside each result, case-insensitively.
- Highlighting is rendered as elements, never by injecting HTML strings.

## Acceptance criteria
- Typing "react" quickly sends a single request, visible in the Network tab.
- At least one automated test.

## Stretch goals
Optional; only after all five core questions are done.
- Full keyboard navigation and screen-reader support.
- Reuse results for repeated queries.
