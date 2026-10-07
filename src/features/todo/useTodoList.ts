import { persistedStateKey } from '../../shared/persistence/persistedStateKey'
import { usePersistedState } from '../../shared/persistence/usePersistedState'
import { addTodo } from './addTodo'
import { clearCompletedTodos } from './clearCompletedTodos'
import { deleteTodo } from './deleteTodo'
import { renameTodo } from './renameTodo'
import { setTodoCompleted } from './setTodoCompleted'
import type { Todo } from './Todo'
import type { TodoFilter } from './TodoFilter'
import { emptyTodoListState, todoListStateSchema } from './TodoListState'

const TODO_LIST_KEY = persistedStateKey({ feature: 'todo', version: 1 })

export function useTodoList() {
  const [{ todos, filter }, setTodoList] = usePersistedState({
    key: TODO_LIST_KEY,
    schema: todoListStateSchema,
    defaultValue: emptyTodoListState,
  })

  function changeTodos(change: (todos: Todo[]) => Todo[]) {
    setTodoList((previous) => ({ ...previous, todos: change(previous.todos) }))
  }

  return {
    todos,
    filter,
    chooseFilter: (chosenFilter: TodoFilter) => {
      setTodoList((previous) => ({ ...previous, filter: chosenFilter }))
    },
    add: (title: string) => {
      const id = crypto.randomUUID()
      changeTodos((current) => addTodo(current, { id, title }))
    },
    rename: (id: string, title: string) => {
      changeTodos((current) => renameTodo(current, { id, title }))
    },
    setCompleted: (id: string, completed: boolean) => {
      changeTodos((current) => setTodoCompleted(current, { id, completed }))
    },
    remove: (id: string) => {
      changeTodos((current) => deleteTodo(current, id))
    },
    clearCompleted: () => {
      changeTodos(clearCompletedTodos)
    },
  }
}
