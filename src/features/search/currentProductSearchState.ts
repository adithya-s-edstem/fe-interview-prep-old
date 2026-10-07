import type { FinishedProductSearch } from './FinishedProductSearch'
import type { ProductSearchState } from './ProductSearchState'

export function currentProductSearchState({
  query,
  attempt,
  finished,
}: {
  query: string
  attempt: number
  finished: FinishedProductSearch | undefined
}): ProductSearchState {
  if (query === '') {
    return { status: 'idle' }
  }
  if (finished?.query !== query || finished.attempt !== attempt) {
    return { status: 'loading', query }
  }
  return { query, ...finished.outcome }
}
