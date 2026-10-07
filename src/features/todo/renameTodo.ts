import type { Todo } from './Todo'
import { todoTitleSchema } from './todoTitleSchema'

export function renameTodo(todos: Todo[], { id, title }: { id: string; title: string }): Todo[] {
  const parsedTitle = todoTitleSchema.safeParse(title)
  if (!parsedTitle.success) {
    return todos
  }
  return todos.map((todo) => (todo.id === id ? { ...todo, title: parsedTitle.data } : todo))
}
