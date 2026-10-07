# Delivery

How the assignment is submitted. Applies to every question.

## Repository setup
- A public GitHub repository named `fe-interview-prep`.
- `main` holds a React + TypeScript app with a linter and a test runner before any question starts.
- Each question lives on its own page or route.

## Branches
One branch per question, created from the latest `main`, merged in order from Q1 to Q5:

| Question | Branch |
|---|---|
| Q1 | `feature/q1-todo` |
| Q2 | `feature/q2-search` |
| Q3 | `feature/q3-form-wizard` |
| Q4 | `feature/q4-data-table` |
| Q5 | `feature/q5-auth-flow` |

After a merge, pull `main` before starting the next branch.

## Commits
- Small, meaningful steps, for example `Add search input` or `Ignore outdated search results`.
- No commits named `fix`, `changes` or `final`.

## Pull requests
- One PR into `main` per question; its description follows `.github/pull_request_template.md`, which is the
  assignment's PR description template.
- Screenshots or a GIF of the UI are attached.
- The author reviews their own diff before merging.

## README
The repository README explains how to run the app and the tests, and keeps this table updated as PRs merge:

| # | Question | PR link |
|---|---|---|
| 1 | Todo App | |
| 2 | Live Search | |
| 3 | Registration Wizard | |
| 4 | Data Table | |
| 5 | Login & Session Handling | |

Video: link added after the last merge.

## Video
- One screen recording of at most 2 minutes covering all five questions, recorded after the last merge.
- Uploaded to YouTube as Unlisted; the link goes in the README.
- Any recorder (Loom, OBS, QuickTime, built-in). Face camera optional, voice clear, editor font at least 16px.

| Time | What to show |
|---|---|
| 0:00–0:10 | Quick tour of the repo and the merged PRs |
| 0:10–1:50 | About 20 seconds per question: what it does and the most important decision made |
| 1:50–2:00 | One thing to improve with more time |

No line-by-line walkthrough: show the one piece of code that matters most and say why it was built that way.

## Submission checklist
- [ ] Public repo `fe-interview-prep` created, with a README.
- [ ] 5 branches, 5 PRs, all merged into `main`.
- [ ] Every PR uses the description template and includes screenshots or a GIF.
- [ ] The README explains how to run the app and the tests.
- [ ] Tests, lint and type-check all pass.
- [ ] Code and PRs done within 2 hours; video of at most 2 minutes uploaded (Unlisted) within 30 minutes after.
- [ ] The README has every PR link and the YouTube link.
- [ ] Every file in the repo can be explained without AI help.
