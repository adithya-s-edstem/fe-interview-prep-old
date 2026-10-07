import { z } from 'zod'

export const todoTitleSchema = z.string().trim().min(1)
