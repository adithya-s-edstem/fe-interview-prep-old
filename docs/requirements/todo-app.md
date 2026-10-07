# Q1 — Todo App

A todo app that survives a page refresh. Route: `/todo`. Branch: `feature/q1-todo`.

## Manage todos
- The user can add a todo with a title.
- The user can edit an existing todo's title.
- The user can delete a todo.
- The user can mark a todo complete and mark it active again.

## Title validation
- Empty or whitespace-only titles are ignored on add and on edit; no todo is created or changed.
- Titles are trimmed before saving.

## Filters
- The user can filter the list by All, Active or Completed.
- The selected filter is visibly marked.

## Items left
- The app shows how many todos are still active, for example "3 items left".
- The count is derived from the todos, never stored separately.

## Clear completed
- A "Clear completed" button removes every completed todo and leaves active ones untouched.

## Persistence
- Todos and the selected filter survive a page refresh.
- Missing or unreadable saved data starts the app with an empty list and the All filter instead of crashing.

## Reusable persistence
The saving logic is a reusable piece that other features can use with their own data, not code specific to
todos. See `docs/architecture/persistence.md`.

## Acceptance criteria
- Refreshing the page keeps the todos and the filter.
- At least one automated test.

## Stretch goals
Optional; only after all five core questions are done.
- Reorder todos by dragging.
- Keep the filter in the URL.
