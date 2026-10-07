import { describe, expect, it } from 'vitest'
import { persistedStateKey } from './persistedStateKey'

describe('persistedStateKey', () => {
  it('namespaces the key by app, feature and version', () => {
    expect(persistedStateKey({ feature: 'todo', version: 1 })).toBe('fe-prep:todo:v1')
  })

  it('gives a new version a new key so old data is abandoned', () => {
    expect(persistedStateKey({ feature: 'todo', version: 2 })).not.toBe(
      persistedStateKey({ feature: 'todo', version: 1 }),
    )
  })
})
