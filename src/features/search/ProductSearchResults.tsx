import { ProductList } from './ProductList'
import type { ProductSearchState } from './ProductSearchState'
import { SearchFailure } from './SearchFailure'

export function ProductSearchResults({ state, onRetry }: { state: ProductSearchState; onRetry: () => void }) {
  switch (state.status) {
    case 'idle':
      return <p className="py-4 text-slate-600">Type to search products.</p>
    case 'loading':
      return (
        <p role="status" className="py-4 break-words text-slate-600">
          Searching for &apos;{state.query}&apos;…
        </p>
      )
    case 'failed':
      return <SearchFailure query={state.query} onRetry={onRetry} />
    case 'found':
      return state.products.length === 0 ? (
        <p className="py-4 break-words text-slate-600">No results for &apos;{state.query}&apos;</p>
      ) : (
        <ProductList products={state.products} query={state.query} />
      )
  }
}
