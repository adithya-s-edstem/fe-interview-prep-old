# 0008 Token storage

## Status
Accepted

## Context
Q5 asks us to decide where to keep tokens and to justify it. The access token lasts 30 seconds and the refresh
token 10 minutes. A reload must restore the session without flashing the login page.

## Decision
- **Access token:** kept only in JavaScript memory, in a module the HTTP client reads. It is lost on reload.
- **Refresh token:** kept in a cookie set by the backend on login and refresh. A real backend would mark it
  `httpOnly`, `Secure` and `SameSite=Strict`, scoped to the refresh path. The MSW mock cannot set `httpOnly`, so
  it stands in for one; application code never reads it.
- **Reload:** the app calls refresh once on start, which sends the cookie and returns a new access token.

## Alternatives considered
- **Both tokens in `localStorage`:** simplest, and survives reload, but any XSS can read both tokens and keep the
  session for 10 minutes.
- **Both tokens in `sessionStorage`:** limited to the tab, but with the same XSS exposure, and no sharing between
  tabs.
- **Both tokens in memory only:** safest, but every reload logs the user out, which breaks the session-restore
  requirement.

## Consequences
- XSS cannot read the refresh token in a real deployment; a stolen access token is useful for 30 seconds at most.
- Every reload costs one refresh call before protected data loads, which the `checking` state covers
  (`docs/architecture/auth-session.md#session-restore`).
- Cookies bring CSRF exposure on the refresh endpoint, which `SameSite=Strict` mitigates in a real deployment.
