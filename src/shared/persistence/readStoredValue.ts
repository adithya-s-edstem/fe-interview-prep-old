import type { PersistedStateOptions } from './PersistedStateOptions'

export function readStoredValue<Value>({ key, schema, defaultValue }: PersistedStateOptions<Value>): Value {
  try {
    const saved = localStorage.getItem(key)
    if (saved === null) {
      return defaultValue
    }
    const parsed = schema.safeParse(JSON.parse(saved))
    return parsed.success ? parsed.data : defaultValue
  } catch {
    return defaultValue
  }
}
