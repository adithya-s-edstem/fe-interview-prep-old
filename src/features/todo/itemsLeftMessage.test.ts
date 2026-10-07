import { describe, expect, it } from 'vitest'
import { itemsLeftMessage } from './itemsLeftMessage'

describe('itemsLeftMessage', () => {
  it.each([
    { count: 0, message: '0 items left' },
    { count: 1, message: '1 item left' },
    { count: 2, message: '2 items left' },
  ])('says "$message" for $count active todos', ({ count, message }) => {
    expect(itemsLeftMessage(count)).toBe(message)
  })
})
