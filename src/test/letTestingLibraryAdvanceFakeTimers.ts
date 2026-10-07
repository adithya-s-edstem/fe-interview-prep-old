import { vi } from 'vitest'

export function letTestingLibraryAdvanceFakeTimers() {
  vi.stubGlobal('jest', {
    advanceTimersByTime: (milliseconds: number) => {
      vi.advanceTimersByTime(milliseconds)
    },
  })
}
