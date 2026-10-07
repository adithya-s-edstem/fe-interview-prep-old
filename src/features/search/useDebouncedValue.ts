import { useEffect, useState } from 'react'

export function useDebouncedValue<Value>(value: Value, delayMilliseconds: number) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delayMilliseconds)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delayMilliseconds])

  return debouncedValue
}
