import type { Todo } from './Todo'
import { todosMatchingFilter } from './todosMatchingFilter'

export function clearCompletedTodos(todos: Todo[]): Todo[] {
  return todosMatchingFilter(todos, 'active')
}
