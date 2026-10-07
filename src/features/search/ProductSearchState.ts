import type { Product } from './Product'

export type ProductSearchState =
  | { status: 'idle' }
  | { status: 'loading'; query: string }
  | { status: 'failed'; query: string }
  | { status: 'found'; query: string; products: Product[] }
