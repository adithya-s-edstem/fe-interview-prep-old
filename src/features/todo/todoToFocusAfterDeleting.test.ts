import { describe, expect, it } from 'vitest'
import type { Todo } from './Todo'
import { todoToFocusAfterDeleting } from './todoToFocusAfterDeleting'

function todosTitled(titles: string[]): Todo[] {
  return titles.map((title) => ({ id: title, title, completed: false }))
}

describe('todoToFocusAfterDeleting', () => {
  it.each([
    { case: 'the todo after the deleted one', deleted: 'b', expected: 'c' },
    { case: 'the todo before when the last one is deleted', deleted: 'c', expected: 'b' },
    { case: 'the second todo when the first one is deleted', deleted: 'a', expected: 'b' },
  ])('picks $case', ({ deleted, expected }) => {
    expect(todoToFocusAfterDeleting(todosTitled(['a', 'b', 'c']), deleted)?.id).toBe(expected)
  })

  it('picks nothing when the only todo is deleted', () => {
    expect(todoToFocusAfterDeleting(todosTitled(['a']), 'a')).toBeUndefined()
  })

  it('never picks the deleted todo', () => {
    const todos = todosTitled(['a', 'b', 'c', 'd'])

    for (const todo of todos) {
      expect(todoToFocusAfterDeleting(todos, todo.id)?.id).not.toBe(todo.id)
    }
  })
})
