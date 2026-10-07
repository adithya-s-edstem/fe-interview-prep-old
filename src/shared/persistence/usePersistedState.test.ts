import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { z } from 'zod'
import { usePersistedState } from './usePersistedState'

const COUNTER_KEY = 'fe-prep:counter:v1'
const counterSchema = z.object({ count: z.number() })

function renderCounter(key = COUNTER_KEY) {
  return renderHook(() => usePersistedState({ key, schema: counterSchema, defaultValue: { count: 0 } }))
}

function currentCount(counter: ReturnType<typeof renderCounter>) {
  return counter.result.current[0].count
}

function setCount(counter: ReturnType<typeof renderCounter>, count: number) {
  act(() => {
    counter.result.current[1]({ count })
  })
}

describe('usePersistedState', () => {
  it('starts from the default value when nothing is saved', () => {
    const counter = renderCounter()

    expect(currentCount(counter)).toBe(0)
  })

  it('restores the latest value after a remount', () => {
    const firstMount = renderCounter()
    setCount(firstMount, 3)
    firstMount.unmount()

    const secondMount = renderCounter()

    expect(currentCount(secondMount)).toBe(3)
  })

  it('applies updater functions to the current value like useState', () => {
    const counter = renderCounter()
    setCount(counter, 2)

    act(() => {
      counter.result.current[1]((previous) => ({ count: previous.count + 1 }))
    })

    expect(currentCount(counter)).toBe(3)
    expect(currentCount(renderCounter())).toBe(3)
  })

  it('keeps the data of different keys apart', () => {
    setCount(renderCounter('fe-prep:first:v1'), 1)
    setCount(renderCounter('fe-prep:second:v1'), 2)

    expect(currentCount(renderCounter('fe-prep:first:v1'))).toBe(1)
    expect(currentCount(renderCounter('fe-prep:second:v1'))).toBe(2)
  })

  it.each([
    { case: 'is not JSON', saved: '{not json' },
    { case: 'does not match the schema', saved: JSON.stringify({ count: 'three' }) },
    { case: 'is JSON null', saved: 'null' },
  ])('starts from the default value when the saved data $case', ({ saved }) => {
    localStorage.setItem(COUNTER_KEY, saved)

    const counter = renderCounter()

    expect(currentCount(counter)).toBe(0)
  })

  it('starts from the default value when storage cannot be read', () => {
    localStorage.setItem(COUNTER_KEY, JSON.stringify({ count: 5 }))
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage is disabled', 'SecurityError')
    })

    const counter = renderCounter()

    expect(currentCount(counter)).toBe(0)
  })

  it('keeps working in memory when storage refuses to save', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage is full', 'QuotaExceededError')
    })
    const counter = renderCounter()

    setCount(counter, 4)

    expect(currentCount(counter)).toBe(4)
  })
})
