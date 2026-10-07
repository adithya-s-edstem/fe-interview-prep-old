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

## Source
The original brief is `Frontend_Interview_Prep_Assignment.pdf` in this folder. The Markdown docs below restate it
as anchorable requirements and add our design; where they disagree with the PDF, fix the doc.

## Index

### Requirements
| File | Covers |
|---|---|
| [overview.md](requirements/overview.md) | Goal, constraints, time limit, assessment, library rule, AI policy |
| [delivery.md](requirements/delivery.md) | Repo setup, branches, commits, PRs, README, video, checklist |
| [todo-app.md](requirements/todo-app.md) | Q1 Todo App |
| [live-search.md](requirements/live-search.md) | Q2 Live Search |
| [registration-wizard.md](requirements/registration-wizard.md) | Q3 Registration Wizard |
| [data-table.md](requirements/data-table.md) | Q4 Data Table |
| [auth-session.md](requirements/auth-session.md) | Q5 Login & Session Handling |

### Architecture
| File | Covers |
|---|---|
| [app-shell.md](architecture/app-shell.md) | Routes, folder layout, shared modules |
| [persistence.md](architecture/persistence.md) | Reusable persisted-state hook (Q1, Q3) |
| [url-state.md](architecture/url-state.md) | URL as the Q4 view state |
| [data-table.md](architecture/data-table.md) | Generic table and its data pipeline (Q4) |
| [http-client.md](architecture/http-client.md) | Fetch wrapper, adapters, debounce and race safety (Q2) |
| [mock-backend.md](architecture/mock-backend.md) | MSW endpoints, tokens, refresh cookie (Q5) |
| [auth-session.md](architecture/auth-session.md) | Single-flight refresh, guards, session restore (Q5) |
| [testing.md](architecture/testing.md) | Test approach, required proofs, quality gates |

### Decisions
| Record | Decision |
|---|---|
| [0001](decisions/0001-vite-react-typescript-strict.md) | Vite, React and strict TypeScript |
| [0002](decisions/0002-react-router.md) | React Router |
| [0003](decisions/0003-react-hook-form-zod.md) | React Hook Form and Zod |
| [0004](decisions/0004-tailwind-css.md) | Tailwind CSS |
| [0005](decisions/0005-vitest-testing-library.md) | Vitest and Testing Library |
| [0006](decisions/0006-msw-mock-backend.md) | MSW as the mock backend |
| [0007](decisions/0007-hand-written-core-mechanics.md) | Hand-write the core mechanics |
| [0008](decisions/0008-token-storage.md) | Token storage |
| [0009](decisions/0009-localstorage-persistence.md) | localStorage for persisted state |
| [0010](decisions/0010-url-as-table-state.md) | URL as the table's view state |
| [0011](decisions/0011-one-ticket-per-question.md) | One ticket per question |
| [0012](decisions/0012-table-dataset.md) | Seeded randomuser.me users as the table dataset |
| [0013](decisions/0013-product-search-api.md) | DummyJSON product search as the Q2 API |
| [0014](decisions/0014-property-based-tests.md) | Property-based tests with fast-check |
| [0015](decisions/0015-supported-browsers.md) | Supported browsers: Baseline 2025 |
