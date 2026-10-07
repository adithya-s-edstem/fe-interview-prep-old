import { http } from 'msw'
import { server } from '../../../mocks/server'
import { PRODUCT_SEARCH_URL } from '../productSearchUrl'

export function mockProductSearch(answer: (query: string) => Response | Promise<Response>) {
  const searchedQueries: string[] = []
  const cancelledQueries: string[] = []
  server.use(
    http.get(PRODUCT_SEARCH_URL, ({ request }) => {
      const query = new URL(request.url).searchParams.get('q') ?? ''
      searchedQueries.push(query)
      request.signal.addEventListener('abort', () => cancelledQueries.push(query))
      return answer(query)
    }),
  )
  return { searchedQueries, cancelledQueries }
}
