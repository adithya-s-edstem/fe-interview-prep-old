import fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { highlightMatches } from './highlightMatches'

const letters = fc.string({ unit: fc.constantFrom(...'abcdefghijklmnopqrstuvwxyz'), minLength: 1 })
const textWithoutLetters = fc.string({ unit: fc.constantFrom(...'0123456789 -,.') })

function matchedTexts(text: string, query: string) {
  return highlightMatches(text, query)
    .filter((part) => part.isMatch)
    .map((part) => part.text)
}

describe('highlightMatches', () => {
  it('keeps every character of the text, in order', () => {
    fc.assert(
      fc.property(fc.string(), fc.string(), (text, query) => {
        const joined = highlightMatches(text, query)
          .map((part) => part.text)
          .join('')

        expect(joined).toBe(text)
      }),
    )
  })

  it('highlights the query wherever it appears, whatever its case', () => {
    fc.assert(
      fc.property(textWithoutLetters, letters, textWithoutLetters, fc.boolean(), (before, query, after, isUpper) => {
        const shownQuery = isUpper ? query.toUpperCase() : query

        expect(matchedTexts(`${before}${shownQuery}${after}`, query)).toEqual([shownQuery])
      }),
    )
  })

  it('highlights every occurrence of the query', () => {
    expect(matchedTexts('Red paint for a red door', 'RED')).toEqual(['Red', 'red'])
  })

  it('highlights nothing when the text does not contain the query', () => {
    expect(highlightMatches('Blue paint', 'red')).toEqual([{ text: 'Blue paint', isMatch: false }])
  })

  it('treats characters with a special meaning in patterns as plain text', () => {
    expect(matchedTexts('Price (USD) is $5.00', '(usd)')).toEqual(['(USD)'])
    expect(matchedTexts('anything', '.*')).toEqual([])
  })

  it('highlights nothing for an empty query', () => {
    expect(highlightMatches('Red paint', '')).toEqual([{ text: 'Red paint', isMatch: false }])
  })
})
