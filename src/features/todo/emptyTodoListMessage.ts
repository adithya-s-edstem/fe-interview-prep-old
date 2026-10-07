import type { TodoFilter } from './TodoFilter'

export function emptyTodoListMessage({ hasTodos, filter }: { hasTodos: boolean; filter: TodoFilter }) {
  return hasTodos ? `No ${filter} todos.` : 'Nothing to do yet. Add your first todo above.'
}
