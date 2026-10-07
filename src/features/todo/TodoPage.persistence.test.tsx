import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { saveFromAnotherTab } from '../../test/saveFromAnotherTab'
import { addTodos } from './test/addTodos'
import { filterButton } from './test/filterButton'
import { savedTodos } from './test/savedTodos'
import { shownItemsLeft } from './test/shownItemsLeft'
import { renderTodoPage } from './test/renderTodoPage'
import { shownTodoTitles } from './test/shownTodoTitles'

const TODO_STORAGE_KEY = 'fe-prep:todo:v1'

describe('todo page: surviving a refresh', () => {
  it('restores the todos and the chosen filter after a remount', async () => {
    const firstVisit = renderTodoPage()
    await addTodos(firstVisit.user, ['Buy milk', 'Walk the dog', 'Read a book'])
    await firstVisit.user.click(screen.getByRole('checkbox', { name: 'Walk the dog' }))
    await firstVisit.user.click(filterButton('Active'))
    firstVisit.page.unmount()

    renderTodoPage()

    expect(shownTodoTitles()).toEqual(['Buy milk', 'Read a book'])
    expect(filterButton('Active')).toHaveAttribute('aria-pressed', 'true')
    expect(shownItemsLeft()).toBe('2 items left')
  })

  it('restores edits and completion after a remount', async () => {
    const firstVisit = renderTodoPage()
    await addTodos(firstVisit.user, ['Buy milk'])
    await firstVisit.user.click(screen.getByRole('button', { name: 'Edit Buy milk' }))
    await firstVisit.user.type(screen.getByRole('textbox', { name: 'New title for Buy milk' }), ' and bread{Enter}')
    await firstVisit.user.click(screen.getByRole('checkbox', { name: 'Buy milk and bread' }))
    firstVisit.page.unmount()

    renderTodoPage()

    expect(screen.getByRole('checkbox', { name: 'Buy milk and bread' })).toBeChecked()
  })

  it('keeps a todo added in another tab when this tab saves', async () => {
    const thisTab = renderTodoPage()
    await addTodos(thisTab.user, ['Buy milk'])
    const otherTabTodos = [...savedTodos(), { id: 'from-other-tab', title: 'Walk the dog', completed: false }]
    saveFromAnotherTab(TODO_STORAGE_KEY, JSON.stringify({ todos: otherTabTodos, filter: 'all' }))

    await addTodos(thisTab.user, ['Read a book'])

    expect(shownTodoTitles()).toEqual(['Buy milk', 'Walk the dog', 'Read a book'])
    expect(savedTodos().map((todo) => todo.title)).toEqual(['Buy milk', 'Walk the dog', 'Read a book'])
  })

  it.each([
    { case: 'is missing', saved: null },
    { case: 'is not JSON', saved: '{"todos": [' },
    { case: 'has the wrong shape', saved: JSON.stringify({ todos: 'Buy milk', filter: 'active' }) },
    { case: 'has an unknown filter', saved: JSON.stringify({ todos: [], filter: 'someday' }) },
  ])('starts empty on the All filter when the saved data $case', ({ saved }) => {
    if (saved !== null) {
      localStorage.setItem(TODO_STORAGE_KEY, saved)
    }

    renderTodoPage()

    expect(shownTodoTitles()).toEqual([])
    expect(filterButton('All')).toHaveAttribute('aria-pressed', 'true')
  })

  it('ignores whitespace-only titles in the saved data', () => {
    const blankTodo = { id: 'blank', title: '   ', completed: false }
    localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify({ todos: [blankTodo], filter: 'all' }))

    renderTodoPage()

    expect(shownTodoTitles()).toEqual([])
  })
})
