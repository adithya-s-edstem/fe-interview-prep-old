import { useState } from 'react'
import { ProductSearchResults } from './ProductSearchResults'
import { SearchBox } from './SearchBox'
import { useProductSearch } from './useProductSearch'
import { useSearchQuery } from './useSearchQuery'

export function SearchPage() {
  const [typedText, setTypedText] = useState('')
  const productSearch = useProductSearch(useSearchQuery(typedText))

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <SearchBox text={typedText} onChange={setTypedText} />
      <ProductSearchResults state={productSearch.state} onRetry={productSearch.retry} />
    </section>
  )
}
