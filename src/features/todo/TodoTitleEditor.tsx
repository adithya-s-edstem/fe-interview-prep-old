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
  const [titleError, setTitleError] = useState<string>()
  const inputId = useId()
  const errorId = useId()

  function saveDraft(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedTitle = todoTitleSchema.safeParse(draft)
    if (parsedTitle.success) {
      onSave(draft)
      return
    }
    setTitleError(parsedTitle.error.issues[0]?.message)
  }

  function cancelOnEscape(event: KeyboardEvent<HTMLFormElement>) {
    if (event.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <form onSubmit={saveDraft} onKeyDown={cancelOnEscape} className="flex min-w-0 flex-1 flex-col gap-1">
      <div className="flex gap-2">
        <label htmlFor={inputId} className="sr-only">
          {`New title for ${title}`}
        </label>
        <input
          id={inputId}
          value={draft}
          onChange={(event) => {
            setDraft(event.target.value)
            setTitleError(undefined)
          }}
          aria-invalid={titleError !== undefined}
          aria-describedby={titleError === undefined ? undefined : errorId}
          autoFocus
          className={todoInputClassName}
        />
        <button type="submit" className={todoButtonClassName}>
          Save
        </button>
        <button type="button" onClick={onCancel} className={todoButtonClassName}>
          Cancel
        </button>
      </div>
      {titleError !== undefined && (
        <p id={errorId} role="alert" className="text-sm text-red-700">
          {titleError}
        </p>
      )}
    </form>
  )
}
