import type { Todo } from './Todo'
import type { TodoFilter } from './TodoFilter'

const matchesFilter: Record<TodoFilter, (todo: Todo) => boolean> = {
  all: () => true,
  active: (todo) => !todo.completed,
  completed: (todo) => todo.completed,
}

export function todosMatchingFilter(todos: Todo[], filter: TodoFilter): Todo[] {
  return todos.filter(matchesFilter[filter])
}
