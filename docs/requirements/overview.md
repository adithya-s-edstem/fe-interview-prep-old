# Overview

Source: `docs/Frontend_Interview_Prep_Assignment.pdf`.

## Goal
Build five React + TypeScript features in one GitHub repository, ship each as its own pull request, and record one
video of at most 2 minutes that explains all five. The features are:

| # | Feature | Requirements |
|---|---|---|
| Q1 | Todo App | [todo-app.md](todo-app.md) |
| Q2 | Live Search | [live-search.md](live-search.md) |
| Q3 | Registration Wizard | [registration-wizard.md](registration-wizard.md) |
| Q4 | Data Table | [data-table.md](data-table.md) |
| Q5 | Login & Session Handling | [auth-session.md](auth-session.md) |

How the work is delivered (branches, PRs, README, video) is in [delivery.md](delivery.md).

## Stack constraints
- React and TypeScript in strict mode.
- Build tool, routing, forms, state, styling and testing are our choice; see `docs/decisions/`.
- Each question lives on its own page or route.

## Time limit
- 2 hours for all five questions, including PRs and merges.
- Suggested split: Q1 and Q2 15 minutes each, Q3 and Q4 25 minutes each, Q5 40 minutes.
- 30 more minutes after the cut-off to record and upload the video.

## Assessment criteria
- Working UI.
- Clean, typed components.
- Tests.
- Git and PR discipline.
- Above all, understanding of what was built.

## Library rule
No UI or table library may do the core work of a question. Libraries are fine for everything around that core.
See `docs/decisions/0007-hand-written-core-mechanics.md`.

## AI usage policy
Claude Code is expected: use it to write the code fast, and spend the time saved understanding what it wrote.
Be ready to explain every decision and the alternatives considered, and to make a short live change.

AI tools are allowed; not understanding the submitted code is not. The interviewer opens the PRs and asks
questions such as:
- Why does this component re-render? Could you prevent it?
- Why is this value stored rather than calculated?
- What happens if the user types fast, or leaves the page mid-request?
- Why did you choose this library or approach? What alternatives did you consider?
- Change this behaviour live.

A question whose code cannot be explained counts as not done. Every decision therefore has a record in
`docs/decisions/` listing the alternatives considered.
