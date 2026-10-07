# 0015 Supported browsers

## Status
Accepted

## Context
Q2 match highlighting builds its pattern with the built-in `RegExp.escape`
(`docs/requirements/live-search.md#match-highlighting`), so the query's regex characters are matched literally
without hand-written escaping. `RegExp.escape` is Baseline 2025: Chrome and Edge 136, Firefox 134, Safari 18.2.
In an older browser the call throws as soon as results arrive and the page goes blank.

## Decision
The app supports browsers that are Baseline 2025 or newer: Chrome and Edge 136+, Firefox 134+, Safari 18.2+
(macOS and iOS). Older browsers are not supported.

## Alternatives considered
- **Plain text when `RegExp.escape` is missing:** keeps the page working in old browsers, but adds a second code
  path that the supported browsers never run and that silently drops a requirement.
- **`escape-string-regexp` library:** a dependency for one call the platform already provides.
- **Hand-written escaping:** the kind of security-sensitive escaping `style-plugins-first` says not to hand-write.

## Consequences
- The app is assessed in a current desktop browser, which all have `RegExp.escape`.
- Using a newer platform feature means checking it against this list, and raising the list here if needed.
- `tsconfig.app.json` adds only the `ES2025.RegExp` typings, so other ES2025 features still fail type checking.
