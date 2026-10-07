import { itemsLeftMessage } from './itemsLeftMessage'
import { todoButtonClassName } from './todoButtonClassName'

export function TodoFooter({
  activeCount,
  hasCompletedTodos,
  onClearCompleted,
}: {
  activeCount: number
  hasCompletedTodos: boolean
  onClearCompleted: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
      <p role="status" className="text-sm text-slate-600">
        {itemsLeftMessage(activeCount)}
      </p>
      <button type="button" disabled={!hasCompletedTodos} onClick={onClearCompleted} className={todoButtonClassName}>
        Clear completed
      </button>
    </div>
  )
}
