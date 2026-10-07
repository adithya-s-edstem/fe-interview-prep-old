import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { renderAppAt } from '../../../test/renderAppAt'

export function renderSearchPage() {
  vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
  const user = userEvent.setup({ advanceTimers: (milliseconds) => vi.advanceTimersByTime(milliseconds) })
  const page = renderAppAt('/search')
  return { user, page }
}
