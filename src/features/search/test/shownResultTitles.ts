import { screen, within } from '@testing-library/react'

export function shownResultTitles() {
  const list = screen.queryByRole('list', { name: /^Results for/ })
  if (!list) {
    return []
  }
  return within(list)
    .getAllByRole('heading', { level: 2 })
    .map((heading) => heading.textContent)
}
