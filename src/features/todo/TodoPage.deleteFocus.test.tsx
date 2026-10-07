import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { addTodos } from './test/addTodos'
import { deleteWithKeyboard } from './test/deleteWithKeyboard'
import { filterButton } from './test/filterButton'
import { renderTodoPage } from './test/renderTodoPage'

describe('todo page: focus after deleting a todo', () => {
  it('moves focus to the next todo', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk', 'Walk the dog', 'Read a book'])

    await deleteWithKeyboard(user, 'Walk the dog')

    expect(screen.getByRole('checkbox', { name: 'Read a book' })).toHaveFocus()
  })

  it('moves focus to the todo before when the last todo in the list is deleted', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk', 'Walk the dog'])

    await deleteWithKeyboard(user, 'Walk the dog')

    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).toHaveFocus()
  })

  it('moves focus to the new todo box when the list becomes empty', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    await deleteWithKeyboard(user, 'Buy milk')

    expect(screen.getByRole('textbox', { name: 'New todo' })).toHaveFocus()
  })

  it('moves focus to the new todo box when the filtered list becomes empty', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk', 'Walk the dog'])
    await user.click(screen.getByRole('checkbox', { name: 'Walk the dog' }))
    await user.click(filterButton('Active'))

    await deleteWithKeyboard(user, 'Buy milk')

    expect(screen.getByRole('textbox', { name: 'New todo' })).toHaveFocus()
  })

  it('keeps moving focus along the list through repeated deletes', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk', 'Walk the dog', 'Read a book'])

    await deleteWithKeyboard(user, 'Walk the dog')
    await deleteWithKeyboard(user, 'Buy milk')

    expect(screen.getByRole('checkbox', { name: 'Read a book' })).toHaveFocus()
  })
})
