import { z } from 'zod'

export const todoFilterSchema = z.enum(['all', 'active', 'completed'])

export type TodoFilter = z.infer<typeof todoFilterSchema>
