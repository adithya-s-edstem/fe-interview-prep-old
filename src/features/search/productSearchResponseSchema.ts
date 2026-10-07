import { z } from 'zod'
import { productSchema } from './Product'

export const productSearchResponseSchema = z.object({
  products: z.array(productSchema),
})
