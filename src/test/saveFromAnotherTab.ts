import { act } from '@testing-library/react'

export function saveFromAnotherTab(key: string, saved: string) {
  act(() => {
    localStorage.setItem(key, saved)
    window.dispatchEvent(new StorageEvent('storage', { key, newValue: saved, storageArea: localStorage }))
  })
}
