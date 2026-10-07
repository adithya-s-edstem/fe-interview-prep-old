import type { Todo } from './Todo'

export function setTodoCompleted(todos: Todo[], { id, completed }: { id: string; completed: boolean }): Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
}
