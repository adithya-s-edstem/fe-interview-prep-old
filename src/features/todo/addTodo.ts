import type { Todo } from './Todo'
import { todoTitleSchema } from './todoTitleSchema'

export function addTodo(todos: Todo[], { id, title }: { id: string; title: string }): Todo[] {
  const parsedTitle = todoTitleSchema.safeParse(title)
  if (!parsedTitle.success) {
    return todos
  }
  return [...todos, { id, title: parsedTitle.data, completed: false }]
}
