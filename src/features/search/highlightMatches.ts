import type { TextPart } from './TextPart'

export function highlightMatches(text: string, query: string): TextPart[] {
  if (query === '') {
    return [{ text, isMatch: false }]
  }
  const queryAsCapturedGroup = new RegExp(`(${RegExp.escape(query)})`, 'iu')
  return text
    .split(queryAsCapturedGroup)
    .map((part, index) => ({ text: part, isMatch: index % 2 === 1 }))
    .filter((part) => part.text !== '')
}
