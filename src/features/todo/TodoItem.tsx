import { useState } from 'react'
import type { Todo } from './Todo'
import { todoButtonClassName } from './todoButtonClassName'
import type { TodoItemActions } from './TodoItemActions'
import { TodoTitleEditor } from './TodoTitleEditor'

export function TodoItem({ todo, actions }: { todo: Todo; actions: TodoItemActions }) {
  const [isEditing, setIsEditing] = useState(false)
  const [hasFinishedEditing, setHasFinishedEditing] = useState(false)

  function finishEditing() {
    setIsEditing(false)
    setHasFinishedEditing(true)
  }

  if (isEditing) {
    return (
      <li className="flex items-center gap-3 py-2">
        <TodoTitleEditor
          title={todo.title}
          onSave={(title) => {
            actions.rename(todo.id, title)
            finishEditing()
          }}
          onCancel={finishEditing}
        />
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 py-2">
      <label className="flex min-w-0 flex-1 items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(event) => {
            actions.setCompleted(todo.id, event.target.checked)
          }}
          className="size-4 shrink-0"
        />
        <span className={`min-w-0 wrap-anywhere ${todo.completed ? 'text-slate-500 line-through' : ''}`}>
          {todo.title}
        </span>
      </label>
      <button
        type="button"
        aria-label={`Edit ${todo.title}`}
        autoFocus={hasFinishedEditing}
        onClick={() => {
          setIsEditing(true)
        }}
        className={todoButtonClassName}
      >
        Edit
      </button>
      <button
        type="button"
        aria-label={`Delete ${todo.title}`}
        onClick={() => {
          actions.remove(todo.id)
        }}
        className={todoButtonClassName}
      >
        Delete
      </button>
    </li>
  )
}
