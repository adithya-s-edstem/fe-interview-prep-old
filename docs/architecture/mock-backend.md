# Mock backend

The backend for Q5 (`docs/requirements/auth-session.md#mock-backend-endpoints`), built with MSW
(`docs/decisions/0006-msw-mock-backend.md`).

## Setup
- The same request handlers serve the browser (service worker in development) and tests (Node server in Vitest).
- Requests show up in the browser's Network tab, so the single refresh call can be seen there.

## Users
Two seeded users: one with the `user` role and one with the `admin` role. Their credentials are listed on the
login page for the demo.

## Tokens
- Tokens are unsigned, JWT-like strings that encode the user id, role and expiry time, so the mock can check them
  without stored state.
- Access token lifetime: 30 seconds. Refresh token lifetime: 10 minutes.
- A refresh issues a new access token and a new refresh token.
- Logout adds the refresh token to an in-memory revoked list.

## Endpoints
| Method | Path | Auth | Success | Failure |
|---|---|---|---|---|
| POST | `/api/auth/login` | none | `200` access token + user; sets refresh cookie | `401` bad credentials |
| POST | `/api/auth/refresh` | refresh cookie | `200` new access token; rotates cookie | `401` missing or expired |
| POST | `/api/auth/logout` | refresh cookie | `204`; clears cookie and token | — |
| GET | `/api/me` | access token | `200` current user | `401` expired or missing |
| GET | `/api/orders` | access token | `200` orders for the user | `401` |
| GET | `/api/admin/stats` | access token, admin | `200` stats | `401`, `403` non-admin |

## Refresh cookie
The refresh token travels in a cookie set by the login and refresh responses. MSW cannot create a real `httpOnly`
cookie, so the mock stands in for one; application code never reads or writes it.
See `docs/decisions/0008-token-storage.md`.

## Mocked state lifetime
Because tokens carry their own expiry, a page reload, which also resets the mock's memory, does not invalidate
them. Session restore after reload therefore works as it would with a real backend.

## Test controls
Tests can shorten token lifetimes or force the refresh endpoint to fail, so expiry paths are tested without
waiting 30 seconds.
