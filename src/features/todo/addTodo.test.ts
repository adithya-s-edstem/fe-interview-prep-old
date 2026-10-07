import { describe, expect, it } from 'vitest'
import { addTodo } from './addTodo'
import type { Todo } from './Todo'

const existingTodo: Todo = { id: 'existing', title: 'Buy milk', completed: true }

describe('addTodo', () => {
  it('appends an active todo with a trimmed title', () => {
    expect(addTodo([existingTodo], { id: 'new', title: '  Walk the dog ' })).toEqual([
      existingTodo,
      { id: 'new', title: 'Walk the dog', completed: false },
    ])
  })

  it.each(['', ' ', '\t\n  '])('leaves the list unchanged for the blank title %j', (title) => {
    const todos = [existingTodo]

    expect(addTodo(todos, { id: 'new', title })).toBe(todos)
  })
})
