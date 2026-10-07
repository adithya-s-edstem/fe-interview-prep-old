# 0003 React Hook Form and Zod

## Status
Accepted

## Context
Q3 needs per-step validation, a conditional rule (India postal code), a dynamic list of skills, data kept across
steps and persisted across refresh. Persisted data (Q1, Q3) and URL params (Q4) also need runtime validation.

## Decision
- React Hook Form for the wizard: one form instance across all steps, `trigger` on the current step's fields
  before moving on, and `useFieldArray` for skills.
- Zod for schemas: one schema per step, combined for the review step, with a refinement for the postal code rule.
  The same library validates stored data and URL params.

## Alternatives considered
- **Hand-written form state:** possible, but validation, touched state and error display are not the point of Q3.
- **Formik + Yup:** heavier and re-renders more on every keystroke.
- **Valibot:** smaller, but less familiar to reviewers.

## Consequences
- The schemas are the single statement of the validation rules and are unit-testable.
- Uncontrolled inputs keep re-renders low, which is a likely interview question.
