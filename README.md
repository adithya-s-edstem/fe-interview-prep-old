# fe-interview-prep

Five React + TypeScript features, one page each, built for the frontend interview prep assignment.
Requirements, architecture and decisions live in [`docs/`](docs/README.md).

## Run the app
Requires Node.js 24 (see `.nvmrc`).

```
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173). The home page links to every question.

The backend is mocked with [MSW](https://mswjs.io): a service worker answers `/api/*` requests in the browser, so
they appear in the DevTools Network tab. No server needs to run.

## Run the tests and checks
| Command | Checks |
|---|---|
| `npm test` | Vitest and Testing Library, with the same MSW handlers as the browser |
| `npm run test:watch` | Tests in watch mode |
| `npm run lint` | ESLint, no warnings allowed |
| `npm run typecheck` | TypeScript in strict mode |
| `scripts/check-limits.sh` | Lines at most 120 characters, files at most 400 lines |

## Pull requests
| # | Question | PR link |
|---|---|---|
| 1 | Todo App | |
| 2 | Live Search | |
| 3 | Registration Wizard | |
| 4 | Data Table | |
| 5 | Login & Session Handling | |

Video: link added after the last merge.
