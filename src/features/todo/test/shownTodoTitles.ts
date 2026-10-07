import { screen, within } from '@testing-library/react'

export function shownTodoTitles() {
  const list = screen.queryByRole('list', { name: 'Todos' })
  if (!list) {
    return []
  }
  return within(list)
    .getAllByRole('checkbox')
    .map((checkbox) => (checkbox as HTMLInputElement).labels?.[0]?.textContent)
}
