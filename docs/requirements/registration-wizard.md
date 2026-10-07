# Q3 — Registration Wizard

A three-step registration form with validation and a review step. Route: `/register`.
Branch: `feature/q3-form-wizard`.

## Personal info step
Step 1 collects name, email and phone. All three are required; email and phone must be well formed.

## Address step
Step 2 collects country, city and postal code. All three are required, subject to the postal code rule.

## Postal code rule
- When the country is India, the postal code must be exactly 6 digits.
- For any other country, any non-empty postal code is accepted. The brief says "any postal code"; requiring it
  to be non-empty is our choice, so that every address field is required.
- Changing the country re-validates the postal code.

## Preferences step
Step 3 collects a plan (one choice from a fixed list) and a list of skills. The user can add and remove skills;
at least one skill is required, and duplicate or blank skills are not added.

## Step validation
- The user cannot move to the next step until the current one is valid.
- Trying to move forward from an invalid step shows a clear error next to each invalid field.

## Back navigation
Going back to an earlier step keeps everything already entered on every step.

## Progress indicator
A progress indicator shows the current step and how many steps there are, including the review step.

## Review and edit
- A review step shows every entered value grouped by step.
- Each group has a way to edit that step; after editing, the user can return to the review step.

## Simulated submit
- Submitting from the review step simulates an API call with a short delay.
- While submitting, the submit button is disabled so the form cannot be sent twice.
- On success, a success message is shown and the saved progress is cleared.

## Resume after refresh
Refreshing the page mid-way keeps the entered values and the current step. See
`docs/architecture/persistence.md`.

## Acceptance criteria
- An invalid step blocks moving forward and shows clear errors.
- At least one automated test.

## Stretch goals
Optional; only after all five core questions are done.
- Accessible error messages.
- Move focus to the first error.
