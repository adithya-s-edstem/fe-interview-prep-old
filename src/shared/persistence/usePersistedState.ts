import { useEffect, useEffectEvent, useState } from 'react'
import type { PersistedStateOptions } from './PersistedStateOptions'
import { readStoredValue } from './readStoredValue'
import { subscribeToOtherTabSaves } from './subscribeToOtherTabSaves'
import { writeStoredValue } from './writeStoredValue'

export function usePersistedState<Value>(options: PersistedStateOptions<Value>) {
  const { key } = options
  const [value, setValue] = useState(() => readStoredValue(options))
  const [isSaved, setIsSaved] = useState(true)
  const reloadStoredValue = useEffectEvent(() => {
    setValue(readStoredValue(options))
  })

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSaved(writeStoredValue(key, value))
  }, [key, value])

  useEffect(
    () =>
      subscribeToOtherTabSaves(key, () => {
        reloadStoredValue()
      }),
    [key],
  )

  return [value, setValue, isSaved] as const
}
