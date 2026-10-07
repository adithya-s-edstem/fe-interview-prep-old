import { todoListStateSchema } from '../TodoListState'

const TODO_STORAGE_KEY = 'fe-prep:todo:v1'

export function savedTodos() {
  return todoListStateSchema.parse(JSON.parse(localStorage.getItem(TODO_STORAGE_KEY) ?? 'null')).todos
}
