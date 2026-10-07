import { z } from 'zod'
import { todoTitleSchema } from './todoTitleSchema'

export const todoSchema = z.object({
  id: z.string(),
  title: todoTitleSchema,
  completed: z.boolean(),
})

export type Todo = z.infer<typeof todoSchema>
