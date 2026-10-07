import { screen } from '@testing-library/react'

export function shownItemsLeft() {
  return screen.getByRole('status').textContent
}
