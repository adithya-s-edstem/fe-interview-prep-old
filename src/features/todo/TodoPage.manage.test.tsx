import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { addTodos } from './test/addTodos'
import { renderTodoPage } from './test/renderTodoPage'
import { shownTodoTitles } from './test/shownTodoTitles'

describe('todo page: managing todos', () => {
  it('shows an empty list prompt before any todo is added', () => {
    renderTodoPage()

    expect(shownTodoTitles()).toEqual([])
    expect(screen.getByText('Nothing to do yet. Add your first todo above.')).toBeInTheDocument()
  })

  it('adds todos to the end of the list and clears the input', async () => {
    const { user } = renderTodoPage()

    await addTodos(user, ['Buy milk', 'Walk the dog'])

    expect(shownTodoTitles()).toEqual(['Buy milk', 'Walk the dog'])
    expect(screen.getByRole('textbox', { name: 'New todo' })).toHaveValue('')
  })

  it('adds a todo when Enter is pressed in the input', async () => {
    const { user } = renderTodoPage()

    await user.type(screen.getByRole('textbox', { name: 'New todo' }), 'Buy milk{Enter}')

    expect(shownTodoTitles()).toEqual(['Buy milk'])
  })

  it('stores a new title without its surrounding spaces', async () => {
    const { user } = renderTodoPage()

    await addTodos(user, ['   Buy milk  '])

    expect(shownTodoTitles()).toEqual(['Buy milk'])
  })

  it('ignores an empty title on add', async () => {
    const { user } = renderTodoPage()

    await user.click(screen.getByRole('button', { name: 'Add todo' }))

    expect(shownTodoTitles()).toEqual([])
  })

  it('ignores a whitespace-only title on add', async () => {
    const { user } = renderTodoPage()

    await addTodos(user, ['   '])

    expect(shownTodoTitles()).toEqual([])
  })

  it('renames a todo, trimming the new title', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    await user.click(screen.getByRole('button', { name: 'Edit Buy milk' }))
    const titleInput = screen.getByRole('textbox', { name: 'New title for Buy milk' })
    await user.clear(titleInput)
    await user.type(titleInput, '  Buy oat milk {Enter}')

    expect(shownTodoTitles()).toEqual(['Buy oat milk'])
  })

  it('keeps the old title when an edit is whitespace-only', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    await user.click(screen.getByRole('button', { name: 'Edit Buy milk' }))
    const titleInput = screen.getByRole('textbox', { name: 'New title for Buy milk' })
    await user.clear(titleInput)
    await user.type(titleInput, '   ')
    await user.click(screen.getByRole('button', { name: 'Save' }))
    await user.keyboard('{Escape}')

    expect(shownTodoTitles()).toEqual(['Buy milk'])
  })

  it('explains why a blank title cannot be saved and keeps the editor open', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    await user.click(screen.getByRole('button', { name: 'Edit Buy milk' }))
    const titleInput = screen.getByRole('textbox', { name: 'New title for Buy milk' })
    await user.clear(titleInput)
    await user.type(titleInput, '\u200B{Enter}')

    expect(titleInput).toBeInTheDocument()
    expect(titleInput).toHaveAccessibleDescription("Title can't be empty")
    expect(titleInput).toBeInvalid()
  })

  it('hides the blank title message once the title is changed', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])
    await user.click(screen.getByRole('button', { name: 'Edit Buy milk' }))
    const titleInput = screen.getByRole('textbox', { name: 'New title for Buy milk' })
    await user.clear(titleInput)
    await user.click(screen.getByRole('button', { name: 'Save' }))

    await user.type(titleInput, 'B')

    expect(screen.queryByText("Title can't be empty")).not.toBeInTheDocument()
    expect(titleInput).toBeValid()
  })

  it('keeps the old title when an edit is cancelled', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    await user.click(screen.getByRole('button', { name: 'Edit Buy milk' }))
    await user.type(screen.getByRole('textbox', { name: 'New title for Buy milk' }), ' and bread')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(shownTodoTitles()).toEqual(['Buy milk'])
  })

  it('returns focus to the Edit button when an edit ends', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])

    await user.click(screen.getByRole('button', { name: 'Edit Buy milk' }))
    await user.keyboard('{Escape}')

    expect(screen.getByRole('button', { name: 'Edit Buy milk' })).toHaveFocus()
  })

  it('marks a todo complete and active again', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk'])
    const checkbox = screen.getByRole('checkbox', { name: 'Buy milk' })

    await user.click(checkbox)
    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).toBeChecked()

    await user.click(screen.getByRole('checkbox', { name: 'Buy milk' }))
    expect(screen.getByRole('checkbox', { name: 'Buy milk' })).not.toBeChecked()
  })

  it('deletes only the chosen todo', async () => {
    const { user } = renderTodoPage()
    await addTodos(user, ['Buy milk', 'Walk the dog', 'Read a book'])

    await user.click(screen.getByRole('button', { name: 'Delete Walk the dog' }))

    expect(shownTodoTitles()).toEqual(['Buy milk', 'Read a book'])
  })
})
