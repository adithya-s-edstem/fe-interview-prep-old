import { z } from 'zod'
import { todoSchema } from './Todo'
import { todoFilterSchema } from './TodoFilter'

export const todoListStateSchema = z.object({
  todos: z.array(todoSchema),
  filter: todoFilterSchema,
})

export type TodoListState = z.infer<typeof todoListStateSchema>

export const emptyTodoListState: TodoListState = { todos: [], filter: 'all' }
