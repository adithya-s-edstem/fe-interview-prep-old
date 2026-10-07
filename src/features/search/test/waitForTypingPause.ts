import { act } from '@testing-library/react'
import { vi } from 'vitest'
import { SEARCH_DEBOUNCE_MILLISECONDS } from '../searchDebounceMilliseconds'

export async function waitForTypingPause() {
  await act(() => vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MILLISECONDS))
}
