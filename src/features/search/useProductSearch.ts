import { useEffect, useState } from 'react'
import { currentProductSearchState } from './currentProductSearchState'
import type { FinishedProductSearch } from './FinishedProductSearch'
import { searchProducts } from './searchProducts'

export function useProductSearch(query: string) {
  const [attempt, setAttempt] = useState(0)
  const [finished, setFinished] = useState<FinishedProductSearch>()

  useEffect(() => {
    if (query === '') {
      return
    }
    const controller = new AbortController()
    function finish(outcome: FinishedProductSearch['outcome']) {
      if (!controller.signal.aborted) {
        setFinished({ query, attempt, outcome })
      }
    }
    searchProducts(query, controller.signal).then(
      (products) => {
        finish({ status: 'found', products })
      },
      () => {
        finish({ status: 'failed' })
      },
    )
    return () => {
      controller.abort()
      setFinished(undefined)
    }
  }, [query, attempt])

  return {
    state: currentProductSearchState({ query, attempt, finished }),
    retry: () => {
      setAttempt((previous) => previous + 1)
    },
  }
}
