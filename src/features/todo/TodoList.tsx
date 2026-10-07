import { useRef } from 'react'
import type { Todo } from './Todo'
import { TodoItem } from './TodoItem'
import type { TodoItemActions } from './TodoItemActions'
import { todoToFocusAfterDeleting } from './todoToFocusAfterDeleting'

export function TodoList({
  todos,
  emptyMessage,
  actions,
  onListEmptied,
}: {
  todos: Todo[]
  emptyMessage: string
  actions: TodoItemActions
  onListEmptied: () => void
}) {
  const checkboxes = useRef(new Map<string, HTMLInputElement>())

  if (todos.length === 0) {
    return <p className="py-4 text-slate-600">{emptyMessage}</p>
  }

  function removeAndMoveFocus(id: string) {
    const todoToFocus = todoToFocusAfterDeleting(todos, id)
    if (todoToFocus) {
      checkboxes.current.get(todoToFocus.id)?.focus()
    } else {
      onListEmptied()
    }
    actions.remove(id)
  }

  return (
    <ul aria-label="Todos" className="divide-y divide-slate-200">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          actions={{ ...actions, remove: removeAndMoveFocus }}
          checkboxRef={(checkbox) => {
            if (checkbox) {
              checkboxes.current.set(todo.id, checkbox)
            }
            return () => {
              checkboxes.current.delete(todo.id)
            }
          }}
        />
      ))}
    </ul>
  )
}
