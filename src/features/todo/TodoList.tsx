import type { Todo } from './Todo'
import { TodoItem } from './TodoItem'
import type { TodoItemActions } from './TodoItemActions'

export function TodoList({
  todos,
  emptyMessage,
  actions,
}: {
  todos: Todo[]
  emptyMessage: string
  actions: TodoItemActions
}) {
  if (todos.length === 0) {
    return <p className="py-4 text-slate-600">{emptyMessage}</p>
  }

  return (
    <ul aria-label="Todos" className="divide-y divide-slate-200">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} actions={actions} />
      ))}
    </ul>
  )
}
