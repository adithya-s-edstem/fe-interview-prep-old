# Persistence

Reusable saving logic required by Q1 (`docs/requirements/todo-app.md#reusable-persistence`) and used by Q3
(`docs/requirements/registration-wizard.md#resume-after-refresh`). Decision:
`docs/decisions/0009-localstorage-persistence.md`.

## Persisted state hook
A generic hook with the same shape as `useState`, plus a storage key and a schema. It also returns whether the
latest value was saved:

- Reads the stored value once on first render; the stored value is the initial state.
- Writes the value back whenever it changes.
- Follows saves from other open tabs through the `storage` event, so a tab builds on the latest saved value
  instead of overwriting it. Another tab clearing storage resets the value to the caller's default.
- Typed by the schema, so callers get a correctly typed value without casts.

## Storage keys
- Every key is namespaced by feature and version, for example `fe-prep:todo:v1`.
- Bumping the version abandons old data instead of migrating it.
- Q1 saves its todos and selected filter together under `fe-prep:todo:v1`.

## Validation of stored data
- Stored JSON is parsed and validated with a Zod schema before use.
- Missing, unparsable or invalid data falls back to the caller's default value; nothing throws.

## Storage failures
If storage is unavailable or full (private mode, quota), the app keeps working in memory and does not crash.
The hook reports the value as not saved, so callers can warn that changes will be lost on refresh; Q1 shows
"Couldn't save. Changes will be lost when you leave or refresh the page." until a later save succeeds.

## Clearing
Callers can clear their key, for example Q3 after a successful submit.

## What is not persisted
Derived values (Q1 items-left count, Q1 filtered list) are computed from persisted state, never stored.
