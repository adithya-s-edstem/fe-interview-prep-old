# URL state

How Q4 keeps its view in the URL (`docs/requirements/data-table.md#shareable-view-url`). Decision:
`docs/decisions/0010-url-as-table-state.md`.

## Source of truth
The URL search params are the only store of the view state. Components read the view from the URL and write
changes back to it; there is no copy in component state that could drift.

## Parameters
| Param | Meaning | Default |
|---|---|---|
| `q` | Global search text | empty |
| `sort` | Column key | none |
| `dir` | `asc` or `desc` | none |
| `page` | 1-based page number | `1` |
| `size` | `10`, `25` or `50` | `10` |
| `f.<column>` | Value of that column's filter | empty |

Defaults are left out of the URL so links stay short.

## Parsing
- Params are parsed and validated with a schema into a typed view object.
- Unknown or invalid values fall back to defaults.
- A page past the last page is clamped to the last page.

## History
- Sorting, filtering, paging and page-size changes push a history entry, so back and forward move between views.
- Typing in the search box replaces the current entry while typing, so each keystroke is not a separate step.

## Reset to first page
Any change to search, a filter or the page size removes `page` in the same URL update.
