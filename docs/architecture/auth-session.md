# Auth session

How Q5 keeps users logged in (`docs/requirements/auth-session.md`). Token storage:
`docs/decisions/0008-token-storage.md`. Backend: [mock-backend.md](mock-backend.md).

## Session state
An auth provider holds the session status (`checking`, `authenticated`, `anonymous`) and the current user. The
access token is held in a module outside React so the HTTP layer can read it without re-rendering components.

## Request flow
```
request ──► add access token ──► 200 ──► done
                                └─► 401 ──► refresh (shared) ──► ok ──► retry once ──► done
                                                              └─► fail ──► logout ──► /auth/login
```
- A request is retried at most once; a second `401` is returned as an error instead of looping.
- Requests that do not need auth, and the refresh call itself, never trigger a refresh.

## Single-flight refresh
- The first `401` starts a refresh and stores its promise.
- Any `401` that arrives while that promise is pending waits on the same promise instead of starting another.
- The promise is cleared when it settles, so a later expiry starts a fresh refresh.
- Result: three parallel requests after expiry produce exactly one refresh call
  (`docs/requirements/auth-session.md#single-refresh-for-concurrent-failures`).

## Refresh failure
A failed refresh clears the access token and user, sets the status to `anonymous` and sends the user to the login
page. Every request waiting on that refresh rejects.

## Route guards
- A protected-route wrapper renders a loading state while `checking`, the page when `authenticated`, and otherwise
  redirects to `/auth/login` with the original location in navigation state.
- After login, the app navigates back to that location, or to a default page.
- An admin-route wrapper also requires the `admin` role and shows a "not allowed" state otherwise.

## Session restore
On app start the status is `checking`; the provider calls refresh once, then loads the current user. Guards show a
loading state during this check, so the login page never flashes for a user with a valid session.

## Logout
Logout calls the logout endpoint, clears the access token and user, and navigates to the login page.
