import { describe, expect, it } from 'vitest'
import { renameTodo } from './renameTodo'
import type { Todo } from './Todo'

const milk: Todo = { id: 'milk', title: 'Buy milk', completed: true }
const dog: Todo = { id: 'dog', title: 'Walk the dog', completed: false }

describe('renameTodo', () => {
  it('trims the new title and keeps the todo completion and position', () => {
    expect(renameTodo([milk, dog], { id: 'milk', title: ' Buy oat milk  ' })).toEqual([
      { id: 'milk', title: 'Buy oat milk', completed: true },
      dog,
    ])
  })

  it.each(['', '   '])('leaves the list unchanged for the blank title %j', (title) => {
    const todos = [milk, dog]

    expect(renameTodo(todos, { id: 'milk', title })).toBe(todos)
  })
})
