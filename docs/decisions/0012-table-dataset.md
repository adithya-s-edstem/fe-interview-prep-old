# 0012 Table dataset

## Status
Accepted

## Context
Q4 must show 500+ rows. The brief's example, `https://dummyjson.com/users?limit=0`, returns only 208 users, and
no other DummyJSON collection with person-like fields reaches 500. A shared Q4 link must restore the exact view,
so the same URL must always load the same rows in the same order.

## Decision
Fetch 600 users in one request from `https://randomuser.me/api/?results=600&seed=fe-interview-prep`. The fixed
`seed` makes the API return the same users in the same order on every call. Rows are mapped to a flat `User` type
(name, email, gender, age, city, country) at the fetch boundary, and `gender` drives the column filter.

## Alternatives considered
- **DummyJSON users as given:** 208 rows, which fails the 500+ requirement.
- **DummyJSON users repeated to 500+ rows:** meets the count only with duplicate people, which makes search and
  sorting look broken.
- **Rows generated in the app with a seeded faker library:** stable and offline, but adds a dependency and the
  brief asks for a dataset that is fetched.
- **DummyJSON quotes (1,454 rows):** enough rows, but only two text columns, with nothing to filter by.

## Consequences
- 600 rows from a public API, stable across reloads and across machines, so shared links restore the same view.
- The page depends on randomuser.me being up; the loading and error states cover it, and tests mock the endpoint
  with MSW (`0006-msw-mock-backend.md`).
- The seed and the row count are constants in the Q4 page, so changing either is a one-line change.
