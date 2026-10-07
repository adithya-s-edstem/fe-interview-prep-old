import type { z } from 'zod'

export interface PersistedStateOptions<Value> {
  key: string
  schema: z.ZodType<Value>
  defaultValue: Value
}
