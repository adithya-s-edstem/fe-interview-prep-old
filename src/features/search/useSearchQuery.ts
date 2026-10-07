import { SEARCH_DEBOUNCE_MILLISECONDS } from './searchDebounceMilliseconds'
import { useDebouncedValue } from './useDebouncedValue'

export function useSearchQuery(typedText: string) {
  const typedQuery = typedText.trim()
  const debouncedQuery = useDebouncedValue(typedQuery, SEARCH_DEBOUNCE_MILLISECONDS)
  return typedQuery === '' ? '' : debouncedQuery
}
