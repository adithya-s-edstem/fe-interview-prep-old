import type { Product } from './Product'

export interface FinishedProductSearch {
  query: string
  attempt: number
  outcome: { status: 'failed' } | { status: 'found'; products: Product[] }
}
