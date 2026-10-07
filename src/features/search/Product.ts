import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
})

export type Product = z.infer<typeof productSchema>
