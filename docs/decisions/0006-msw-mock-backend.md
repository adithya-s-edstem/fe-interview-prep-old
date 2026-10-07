# 0006 MSW as the mock backend

## Status
Accepted

## Context
Q5 needs a mocked backend with login, refresh, current user, orders and admin stats, and its refresh calls must be
visible in the Network tab. The same backend must drive the Q5 tests.

## Decision
Mock Service Worker. The handlers in `src/mocks/` run as a service worker in development and as a Node interceptor
in Vitest. See `docs/architecture/mock-backend.md`.

## Alternatives considered
- **json-server or a small Express server:** a second process to run and deploy, and custom auth logic is awkward.
- **An in-app fake that replaces `fetch`:** no Network-tab visibility, and app code would know it is mocked.
- **Vite dev-server middleware:** works only in development, not in tests.

## Consequences
- App code calls real URLs with real `fetch` and has no knowledge of the mock.
- Requests are visible in the Network tab, which the Q5 acceptance criterion needs.
- MSW cannot set real `httpOnly` cookies, so the refresh cookie is a stand-in (`0008-token-storage.md`).
