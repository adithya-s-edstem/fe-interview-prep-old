import { useEffect, useState } from 'react'
import type { PersistedStateOptions } from './PersistedStateOptions'
import { readStoredValue } from './readStoredValue'
import { writeStoredValue } from './writeStoredValue'

export function usePersistedState<Value>(options: PersistedStateOptions<Value>) {
  const { key } = options
  const [value, setValue] = useState(() => readStoredValue(options))

  useEffect(() => {
    writeStoredValue(key, value)
  }, [key, value])

  return [value, setValue] as const
}
