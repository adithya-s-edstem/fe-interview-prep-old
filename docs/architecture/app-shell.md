# App shell

How the single app is structured so five independent features can live side by side.

## Runtime
A client-side single-page app built with Vite, React and TypeScript in strict mode
(`docs/decisions/0001-vite-react-typescript-strict.md`), styled with Tailwind (`docs/decisions/0004-tailwind-css.md`).

## Routes
Routing uses React Router (`docs/decisions/0002-react-router.md`). Each question owns one route subtree:

| Route | Feature |
|---|---|
| `/` | Home page linking to every question |
| `/todo` | Q1 Todo App |
| `/search` | Q2 Live Search |
| `/register` | Q3 Registration Wizard |
| `/table` | Q4 Data Table |
| `/auth/*` | Q5 Login & Session Handling |

Unknown routes show a not-found page with a link home.

## Folder layout
```
src/
  app/            routes, layout, providers
  features/
    todo/         Q1
    search/       Q2
    register/     Q3
    table/        Q4
    auth/         Q5
  shared/         code used by more than one feature
  mocks/          MSW handlers and browser/server setup
```
- A feature imports from `shared/` but never from another feature.
- Code moves to `shared/` only once a second feature needs it, except where a requirement asks for reuse
  (persistence for Q1, the table component for Q4).
- Tests live next to the code they test as `*.test.ts(x)`.

## Shared modules
| Module | Used by | Doc |
|---|---|---|
| Persisted state | Q1, Q3 | [persistence.md](persistence.md) |
| HTTP client | Q2, Q4, Q5 | [http-client.md](http-client.md) |
| Data table | Q4 | [data-table.md](data-table.md) |
| URL state | Q4 | [url-state.md](url-state.md) |

## Layout
A shared layout gives every page the same header with links to all questions, and a main content area. Each page
handles its own loading, empty and error states.
