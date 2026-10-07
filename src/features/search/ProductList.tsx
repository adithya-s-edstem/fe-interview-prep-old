import { HighlightedText } from './HighlightedText'
import type { Product } from './Product'

export function ProductList({ products, query }: { products: Product[]; query: string }) {
  return (
    <ul aria-label={`Results for '${query}'`} className="divide-y divide-slate-200">
      {products.map((product) => (
        <li key={product.id} className="flex flex-col gap-1 py-3">
          <h2 className="font-medium break-words">
            <HighlightedText text={product.title} query={query} />
          </h2>
          <p className="text-sm break-words text-slate-600">
            <HighlightedText text={product.description} query={query} />
          </p>
        </li>
      ))}
    </ul>
  )
}
