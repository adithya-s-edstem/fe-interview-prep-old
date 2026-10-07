import { HttpResponse } from 'msw'
import type { Product } from '../Product'

export function productsFound(products: Product[]) {
  return HttpResponse.json({ products, total: products.length, skip: 0, limit: products.length })
}
