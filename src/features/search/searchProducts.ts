import { fetchJson } from '../../shared/http/fetchJson'
import type { Product } from './Product'
import { productSearchResponseSchema } from './productSearchResponseSchema'
import { PRODUCT_SEARCH_URL } from './productSearchUrl'

const MAXIMUM_RESULTS = 20
const RESULT_FIELDS = 'title,description'

export async function searchProducts(query: string, signal: AbortSignal): Promise<Product[]> {
  const url = new URL(PRODUCT_SEARCH_URL)
  url.searchParams.set('q', query)
  url.searchParams.set('limit', String(MAXIMUM_RESULTS))
  url.searchParams.set('select', RESULT_FIELDS)
  const response = await fetchJson(url, { signal })
  return productSearchResponseSchema.parse(response).products
}
