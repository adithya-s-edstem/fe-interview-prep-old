import type { Todo } from './Todo'
import { todosMatchingFilter } from './todosMatchingFilter'

export function countActiveTodos(todos: Todo[]) {
  return todosMatchingFilter(todos, 'active').length
}
