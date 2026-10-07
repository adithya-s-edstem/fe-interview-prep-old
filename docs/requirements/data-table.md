# Q4 — Data Table

A reusable table component used to browse a large dataset. Route: `/table`. Branch: `feature/q4-data-table`.

## Column configuration
- The table works with any kind of row data.
- It is configured by describing its columns (what to show, the header, whether it sorts or filters), not by
  writing table markup per dataset.

## Dataset
- Shows 500+ rows, for example from `https://dummyjson.com/users?limit=0`.
- Loading and error states are shown while the dataset is fetched or if fetching fails.

## Sorting cycle
- Clicking a sortable column header sorts by that column.
- Repeated clicks cycle ascending → descending → none.
- The header shows the current sort direction in a way that does not rely on colour alone.

## Global search
- A single search box filters rows whose visible values contain the text, case-insensitively.

## Column filters
- At least one column has its own filter, for example a gender or role dropdown.
- Column filters and global search combine: a row must match all of them.
- When nothing matches, an empty state is shown.

## Pagination
- Rows are paginated with a page-size choice of 10, 25 or 50.
- The user can move to the next, previous, first and last page, and sees the current page and total pages.

## Reset to first page
Changing the search, a filter or the page size returns to page 1.

## Shareable view URL
- The current view (sort, search, filters, page and page size) is held in the URL.
- Opening that link elsewhere restores the exact same view.
- The browser's back and forward buttons move between views.
- Invalid values in the URL fall back to defaults instead of breaking the page.

See `docs/architecture/url-state.md`.

## No table library
The table, sorting, filtering and pagination are written without a table library.

## Acceptance criteria
- Opening a shared link restores the exact view.
- Changing a filter goes back to page 1.
- At least one automated test.

## Stretch goals
Optional; only after all five core questions are done.
- A server-side mode where each page is fetched.
- A sticky header.
- Show and hide columns.
