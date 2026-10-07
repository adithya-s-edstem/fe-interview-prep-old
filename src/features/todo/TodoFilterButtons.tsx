import { todoFilterSchema, type TodoFilter } from './TodoFilter'

const filterLabels: Record<TodoFilter, string> = { all: 'All', active: 'Active', completed: 'Completed' }

function filterButtonClassName(isChosen: boolean) {
  const base = 'rounded border px-3 py-1 text-sm focus-visible:outline-2 focus-visible:outline-blue-600'
  return isChosen
    ? `${base} border-blue-700 bg-blue-50 font-semibold text-blue-800 underline`
    : `${base} border-transparent hover:border-slate-300`
}

export function TodoFilterButtons({
  chosenFilter,
  onChoose,
}: {
  chosenFilter: TodoFilter
  onChoose: (filter: TodoFilter) => void
}) {
  return (
    <div role="group" aria-label="Filter todos" className="flex gap-2">
      {todoFilterSchema.options.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={filter === chosenFilter}
          onClick={() => {
            onChoose(filter)
          }}
          className={filterButtonClassName(filter === chosenFilter)}
        >
          {filterLabels[filter]}
        </button>
      ))}
    </div>
  )
}
