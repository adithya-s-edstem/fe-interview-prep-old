import { useId, useState, type FormEvent } from 'react'
import { todoButtonClassName } from './todoButtonClassName'
import { todoInputClassName } from './todoInputClassName'

export function NewTodoForm({ onAdd }: { onAdd: (title: string) => void }) {
  const [title, setTitle] = useState('')
  const inputId = useId()

  function submitTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onAdd(title)
    setTitle('')
  }

  return (
    <form onSubmit={submitTitle} className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium">
        New todo
      </label>
      <div className="flex gap-2">
        <input
          id={inputId}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value)
          }}
          placeholder="What needs doing?"
          className={todoInputClassName}
        />
        <button type="submit" className={todoButtonClassName}>
          Add todo
        </button>
      </div>
    </form>
  )
}
