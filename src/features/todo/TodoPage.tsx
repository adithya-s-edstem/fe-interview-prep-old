import { useRef } from 'react'
import { countActiveTodos } from './countActiveTodos'
import { emptyTodoListMessage } from './emptyTodoListMessage'
import { NewTodoForm } from './NewTodoForm'
import { TodoFilterButtons } from './TodoFilterButtons'
import { TodoFooter } from './TodoFooter'
import { TodoList } from './TodoList'
import { todosMatchingFilter } from './todosMatchingFilter'
import { useTodoList } from './useTodoList'

export function TodoPage() {
  const todoList = useTodoList()
  const { todos, filter } = todoList
  const activeCount = countActiveTodos(todos)
  const newTodoInput = useRef<HTMLInputElement>(null)

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <NewTodoForm onAdd={todoList.add} inputRef={newTodoInput} />
      <TodoFilterButtons chosenFilter={filter} onChoose={todoList.chooseFilter} />
      <TodoList
        todos={todosMatchingFilter(todos, filter)}
        emptyMessage={emptyTodoListMessage({ hasTodos: todos.length > 0, filter })}
        actions={todoList}
        onListEmptied={() => {
          newTodoInput.current?.focus()
        }}
      />
      <TodoFooter
        activeCount={activeCount}
        hasCompletedTodos={activeCount < todos.length}
        onClearCompleted={todoList.clearCompleted}
      />
    </section>
  )
}
