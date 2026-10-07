# 0004 Tailwind CSS

## Status
Accepted

## Context
Styling is our choice. Five pages must look clean and work on small screens within a 2-hour limit. No UI library
may do a question's core work.

## Decision
Use Tailwind CSS through its Vite plugin. Small presentational primitives (button, input, field with label and
error) are built once in `src/shared/` with Tailwind classes.

## Alternatives considered
- **CSS Modules:** scoped and dependency-free, but slower to write layouts and states under time pressure.
- **CSS-in-JS (styled-components, Emotion):** adds runtime cost and is falling out of favour with modern React.
- **A component library (MUI, Chakra):** risks breaking the library rule (for example a data grid or stepper) and
  hides the markup the interview asks about.

## Consequences
- Fast styling with consistent spacing and colours, with no runtime cost.
- Long class lists are kept readable by extracting primitives rather than repeating classes.
