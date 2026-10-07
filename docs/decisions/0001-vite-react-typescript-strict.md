# 0001 Vite, React and strict TypeScript

## Status
Accepted

## Context
The assignment fixes React and TypeScript in strict mode and leaves the build tool and linting to us. The app is
a client-only SPA with five feature pages, built under a 2-hour limit.

## Decision
- Vite with the React + TypeScript template as the build tool and dev server.
- `strict: true` in `tsconfig`, plus `noUncheckedIndexedAccess`.
- ESLint flat config with `typescript-eslint` and the React Hooks plugin.
- npm scripts: `dev`, `build`, `lint`, `typecheck`, `test`.

## Alternatives considered
- **Next.js:** server rendering and file routing are not needed for a client-only exercise, and they add
  concepts to explain.
- **Create React App:** deprecated and slow.
- **Biome instead of ESLint:** fast, but has fewer React-specific rules, and the assignment asks for "a linter",
  which ESLint is by convention.

## Consequences
- Fast startup and hot reload, and Vitest reuses the Vite config.
- Strict types catch missing cases at compile time; index access returns `T | undefined` and must be handled.
