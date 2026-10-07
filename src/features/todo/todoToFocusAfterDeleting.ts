import type { Todo } from './Todo'

export function todoToFocusAfterDeleting(todos: Todo[], deletedId: string): Todo | undefined {
  const deletedIndex = todos.findIndex((todo) => todo.id === deletedId)
  return todos[deletedIndex + 1] ?? todos[deletedIndex - 1]
}
