import type { Product } from '../Product'

let nextId = 1

export function aProduct(fields: Partial<Product> = {}): Product {
  const id = nextId++
  return { id, title: `Product ${String(id)}`, description: `Description of product ${String(id)}`, ...fields }
}
