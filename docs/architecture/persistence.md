# Persistence

Reusable saving logic required by Q1 (`docs/requirements/todo-app.md#reusable-persistence`) and used by Q3
(`docs/requirements/registration-wizard.md#resume-after-refresh`). Decision:
`docs/decisions/0009-localstorage-persistence.md`.

## Persisted state hook
A generic hook with the same shape as `useState`, plus a storage key and a schema:

- Reads the stored value once on first render; the stored value is the initial state.
- Writes the value back whenever it changes.
- Typed by the schema, so callers get a correctly typed value without casts.

## Storage keys
- Every key is namespaced by feature and version, for example `fe-prep:todo:v1`.
- Bumping the version abandons old data instead of migrating it.

## Validation of stored data
- Stored JSON is parsed and validated with a Zod schema before use.
- Missing, unparsable or invalid data falls back to the caller's default value; nothing throws.

## Storage failures
If storage is unavailable or full (private mode, quota), the app keeps working in memory and does not crash.

## Clearing
Callers can clear their key, for example Q3 after a successful submit.

## What is not persisted
Derived values (Q1 items-left count, Q1 filtered list) are computed from persisted state, never stored.
