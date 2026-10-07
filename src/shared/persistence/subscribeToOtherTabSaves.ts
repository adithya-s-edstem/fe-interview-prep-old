export function subscribeToOtherTabSaves(key: string, onSave: () => void) {
  function notifyWhenKeyChanges(event: StorageEvent) {
    const isWholeStorageCleared = event.key === null
    const isLocalStorage = event.storageArea === localStorage
    if (isLocalStorage && (isWholeStorageCleared || event.key === key)) {
      onSave()
    }
  }

  window.addEventListener('storage', notifyWhenKeyChanges)
  return () => {
    window.removeEventListener('storage', notifyWhenKeyChanges)
  }
}
