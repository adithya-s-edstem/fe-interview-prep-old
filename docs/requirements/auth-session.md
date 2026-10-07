# Q5 — Login & Session Handling

A login flow where users stay logged in smoothly while short-lived tokens expire in the background.
Routes: `/auth/login`, `/auth/orders` (protected), `/auth/admin` (admin only). Branch: `feature/q5-auth-flow`.

## Mock backend endpoints
A mocked backend provides endpoints for login, token refresh, current user, orders and admin stats.
See `docs/architecture/mock-backend.md`.

## Token lifetimes
- The access token expires after 30 seconds.
- The refresh token expires after 10 minutes.

## Login and logout
- The user can log in with valid credentials; invalid credentials show an error and keep them on the login page.
- The user can log out from any protected page, which ends the session and shows the login page.

## Protected routes
- A logged-out user opening a protected page is sent to the login page.
- After logging in, they return to the page they originally wanted.

## Admin-only page
- One page is visible only to users with the admin role.
- A logged-in non-admin opening it sees a "not allowed" state, not the admin data.

## Silent refresh
When the access token expires, the user does not notice: a request that fails because of expiry refreshes the
token and is retried automatically.

## Single refresh for concurrent failures
If several requests fail at once because of expiry, the app makes exactly one refresh call and retries all of them
with the new token.

## Refresh failure
If the refresh fails (for example the refresh token expired), the user is logged out and sent to the login page.

## Session restore
After a page reload, the session is restored without the login page flashing; a loading state is shown while the
session is checked.

## Token storage
Where the tokens live is a deliberate, justified choice. See `docs/decisions/0008-token-storage.md`.

## Acceptance criteria
- When 3 requests fire in parallel after expiry, the Network tab shows exactly one refresh call.
- At least one automated test proving this.

## Stretch goals
Optional; only after all five core questions are done.
- Logging out in one tab logs out the other tabs.
- An idle-timeout warning.
