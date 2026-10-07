import { useId, useState, type FormEvent, type KeyboardEvent } from 'react'
import { todoButtonClassName } from './todoButtonClassName'
import { todoInputClassName } from './todoInputClassName'
import { todoTitleSchema } from './todoTitleSchema'

export function TodoTitleEditor({
  title,
  onSave,
  onCancel,
}: {
  title: string
  onSave: (title: string) => void
  onCancel: () => void
}) {
  const [draft, setDraft] = useState(title)
  const inputId = useId()

  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (todoTitleSchema.safeParse(draft).success) {
      onSave(draft)
    }
  }

  function cancelOnEscape(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <form onSubmit={saveDraft} onKeyDown={cancelOnEscape} className="flex flex-1 gap-2">
      <label htmlFor={inputId} className="sr-only">
        {`New title for ${title}`}
      </label>
      <input
        id={inputId}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value)
        }}
        autoFocus
        className={todoInputClassName}
      />
      <button type="submit" className={todoButtonClassName}>
        Save
      </button>
      <button type="button" onClick={onCancel} className={todoButtonClassName}>
        Cancel
      </button>
    </form>
  )
}
