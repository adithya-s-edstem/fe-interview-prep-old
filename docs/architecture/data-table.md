# Data table

The reusable table for Q4 (`docs/requirements/data-table.md`). It is written without a table library
(`docs/decisions/0007-hand-written-core-mechanics.md`).

## Column definitions
The table is generic over its row type and configured with a list of column definitions. Each column has:
- a stable `key`;
- a `header` label;
- an accessor that returns the cell's value from a row;
- optional cell rendering for custom display;
- whether it is sortable, and how to compare its values;
- an optional filter kind (for example select with options), which places a filter control for that column.

## Data pipeline
Row processing is a chain of pure functions, kept separate from rendering and tested on their own:

1. Filter by column filters.
2. Filter by global search across the searchable columns' values.
3. Sort by the active column and direction; with no sort, keep the source order.
4. Paginate into the current page and report the total pages.

The pipeline result is derived with memoisation from the rows and the view state; it is never stored in state.

## Component split
- The table component renders headers, rows, sort indicators and empty states from its inputs and emits events
  (sort, filter, search, page, page size). It does not fetch data or read the URL.
- The Q4 page fetches 600 seeded users (`docs/decisions/0012-table-dataset.md`), reads and writes the view
  through [url-state.md](url-state.md), runs the pipeline and passes the result to the table.

## Accessibility
- Sortable headers are buttons and expose `aria-sort`.
- Filter and search inputs have labels; pagination controls have accessible names.
