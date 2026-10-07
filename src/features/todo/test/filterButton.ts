import { screen, within } from '@testing-library/react'

export function filterButton(name: string) {
  return within(screen.getByRole('group', { name: 'Filter todos' })).getByRole('button', { name })
}
