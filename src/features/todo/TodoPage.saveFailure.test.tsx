import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { addTodos } from './test/addTodos'
import { renderTodoPage } from './test/renderTodoPage'
import { shownTodoTitles } from './test/shownTodoTitles'

const SAVE_FAILED_MESSAGE = "Couldn't save. Changes will be lost when you leave or refresh the page."

function refuseToSave() {
  return vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new DOMException('Storage is full', 'QuotaExceededError')
  })
}

describe('todo page: when saving fails', () => {
  it('shows no save warning while saving works', async () => {
    const { user } = renderTodoPage()

    await addTodos(user, ['Buy milk'])

    expect(screen.queryByText(SAVE_FAILED_MESSAGE)).not.toBeInTheDocument()
  })

  it('keeps the new todo on screen and warns that it was not saved', async () => {
    const { user } = renderTodoPage()
    refuseToSave()

    await addTodos(user, ['Buy milk'])

    expect(shownTodoTitles()).toEqual(['Buy milk'])
    expect(screen.getByRole('alert')).toHaveTextContent(SAVE_FAILED_MESSAGE)
  })

  it('removes the warning once a later change is saved', async () => {
    const { user } = renderTodoPage()
    const storageRefusal = refuseToSave()
    await addTodos(user, ['Buy milk'])

    storageRefusal.mockRestore()
    await addTodos(user, ['Walk the dog'])

    expect(screen.queryByText(SAVE_FAILED_MESSAGE)).not.toBeInTheDocument()
  })
})
