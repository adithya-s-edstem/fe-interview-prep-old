import { screen } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { addTodos } from './test/addTodos'
import { filterButton } from './test/filterButton'
import { shownItemsLeft } from './test/shownItemsLeft'
import { renderTodoPage } from './test/renderTodoPage'
import { shownTodoTitles } from './test/shownTodoTitles'

async function completeTodos(user: UserEvent, titles: string[]) {
  for (const title of titles) {
    await user.click(screen.getByRole('checkbox', { name: title }))
  }
}

async function renderMixedTodos() {
  const rendered = renderTodoPage()
  await addTodos(rendered.user, ['Buy milk', 'Walk the dog', 'Read a book'])
  await completeTodos(rendered.user, ['Walk the dog'])
  return rendered
}

describe('todo page: filters, count and clearing', () => {
  it('shows every todo on the All filter by default', async () => {
    await renderMixedTodos()

    expect(shownTodoTitles()).toEqual(['Buy milk', 'Walk the dog', 'Read a book'])
    expect(filterButton('All')).toHaveAttribute('aria-pressed', 'true')
  })

  it.each([
    { filter: 'Active', shown: ['Buy milk', 'Read a book'] },
    { filter: 'Completed', shown: ['Walk the dog'] },
    { filter: 'All', shown: ['Buy milk', 'Walk the dog', 'Read a book'] },
  ])('shows only matching todos on the $filter filter and marks it chosen', async ({ filter, shown }) => {
    const { user } = await renderMixedTodos()

    await user.click(filterButton('Completed'))
    await user.click(filterButton(filter))

    expect(shownTodoTitles()).toEqual(shown)
    for (const name of ['All', 'Active', 'Completed']) {
      expect(filterButton(name)).toHaveAttribute('aria-pressed', String(name === filter))
    }
  })

  it('says so when no todo matches the chosen filter', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    await user.click(filterButton('Completed'))

    expect(shownTodoTitles()).toEqual([])
    expect(screen.getByText('No completed todos.')).toBeInTheDocument()
  })

  it('hides a todo from the Active filter as soon as it is completed', async () => {
    const { user } = await renderMixedTodos()
    await user.click(filterButton('Active'))

    await completeTodos(user, ['Buy milk'])

    expect(shownTodoTitles()).toEqual(['Read a book'])
  })

  it('counts the active todos as the list changes', async () => {
    const { user } = renderTodoPage()
    expect(shownItemsLeft()).toBe('0 items left')

    await addTodos(user, ['Buy milk'])
    expect(shownItemsLeft()).toBe('1 item left')

    await addTodos(user, ['Walk the dog', 'Read a book'])
    expect(shownItemsLeft()).toBe('3 items left')

    await completeTodos(user, ['Walk the dog'])
    expect(shownItemsLeft()).toBe('2 items left')

    await user.click(screen.getByRole('button', { name: 'Delete Buy milk' }))
    expect(shownItemsLeft()).toBe('1 item left')
  })

  it('counts every active todo whatever the chosen filter', async () => {
    const { user } = await renderMixedTodos()

    await user.click(filterButton('Completed'))

    expect(shownItemsLeft()).toBe('2 items left')
  })

  it('removes only completed todos when Clear completed is clicked', async () => {
    const { user } = await renderMixedTodos()
    await completeTodos(user, ['Read a book'])

    await user.click(screen.getByRole('button', { name: 'Clear completed' }))

    expect(shownTodoTitles()).toEqual(['Buy milk'])
    expect(shownItemsLeft()).toBe('1 item left')
  })

  it('disables Clear completed while no todo is completed', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    expect(screen.getByRole('button', { name: 'Clear completed' })).toBeDisabled()
  })
})
