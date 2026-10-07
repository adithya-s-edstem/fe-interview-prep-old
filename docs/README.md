# Project docs

`docs/` is the single source of truth for what the product does and how it is built.
GitHub issues describe *work*; they link here for *meaning*. If an issue and a doc disagree, the doc wins
until the doc is changed.

## Layout

| Folder | Holds | File naming |
|---|---|---|
| `requirements/` | What the product must do, from the user's point of view | `<feature>.md` |
| `architecture/` | How the system is structured: components, data, interfaces, deployment | `<topic>.md` |
| `decisions/` | Architecture decision records: one decision, its context and consequences | `NNNN-<title>.md` |

## Writing docs so tickets can point at them
- One topic per file; one requirement or concept per `##` / `###` heading.
- Headings are stable names, not sentences, so their anchors stay valid: `## Password reset`, not
  `## How we will probably handle resetting passwords`.
- Requirements state observable behaviour that can become acceptance criteria.
- Tickets link with the full anchor: `docs/requirements/auth.md#password-reset`.

## Keeping docs true
- A PR that changes behaviour described here updates the doc in the same PR.
- A decision that changes the architecture adds a new record in `decisions/` instead of rewriting an old one;
  the old record is marked as superseded with a link to the new one.
