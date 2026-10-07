import { act } from '@testing-library/react'

export function clearFromAnotherTab() {
  act(() => {
    localStorage.clear()
    window.dispatchEvent(new StorageEvent('storage', { key: null, storageArea: localStorage }))
  })
}
