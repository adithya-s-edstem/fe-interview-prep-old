# 0009 localStorage for persisted state

## Status
Accepted

## Context
Q1 todos and filter, and Q3 wizard progress, must survive a page refresh. Q1 asks for saving logic that other
features can reuse.

## Decision
A generic persisted-state hook over `localStorage`, storing versioned JSON validated with Zod on read
(`docs/architecture/persistence.md`).

## Alternatives considered
- **`sessionStorage`:** survives refresh, but closing the tab loses the todos, which users would not expect.
- **IndexedDB:** asynchronous, so the first render would need a loading state; overkill for small data.
- **A state library with a persist plugin (Zustand `persist`):** works, but hides the logic Q1 asks us to write.
- **`useSyncExternalStore` across tabs:** a later improvement; not required.

## Consequences
- Reads are synchronous, so the first render already shows saved data with no flash.
- Data is kept per browser and per origin; the Q3 draft holds personal info in plain storage, which is acceptable
  for a demo and is cleared after submit.
