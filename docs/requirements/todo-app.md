# Q1 — Todo App

A todo app that survives a page refresh. Route: `/todo`. Branch: `feature/q1-todo`.

## Manage todos
- The user can add a todo with a title.
- The user can edit an existing todo's title.
- The user can delete a todo. Focus then moves to the next todo shown, the one before it if the deleted todo
  was last, or the new todo box if no todos are left in view.
- The user can mark a todo complete and mark it active again.

## Title validation
- Empty or whitespace-only titles are ignored on add and on edit; no todo is created or changed.
- Invisible characters such as zero-width spaces count as whitespace.
- Titles are trimmed of whitespace before saving; invisible characters inside a title are kept.
- Saving a blank title in the editor keeps the editor open and shows "Title can't be empty" next to the box.

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
- If a change cannot be saved (storage full or blocked), it stays on screen and the page warns that it will be
  lost on refresh.

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
