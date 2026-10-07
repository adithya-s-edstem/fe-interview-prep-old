import { describe, expect, it } from 'vitest'
import { todoTitleSchema } from './todoTitleSchema'

const ZERO_WIDTH_SPACE = '\u200B'
const WORD_JOINER = '\u2060'
const FAMILY_EMOJI = '👨\u200D👩\u200D👧'
const RED_HEART_EMOJI = '❤\uFE0F'

describe('todoTitleSchema', () => {
  it.each([
    { case: 'empty', title: '' },
    { case: 'only spaces and line breaks', title: ' \t\n ' },
    { case: 'only a zero-width space', title: ZERO_WIDTH_SPACE },
    { case: 'invisible characters mixed with spaces', title: ` ${ZERO_WIDTH_SPACE}${WORD_JOINER} ` },
  ])('rejects a title that is $case with "Title can\'t be empty"', ({ title }) => {
    const parsed = todoTitleSchema.safeParse(title)

    expect(parsed.error?.issues.map((issue) => issue.message)).toEqual(["Title can't be empty"])
  })

  it('removes spaces and invisible characters around a title', () => {
    expect(todoTitleSchema.parse(`${ZERO_WIDTH_SPACE} Buy milk ${WORD_JOINER}`)).toBe('Buy milk')
  })

  it('keeps invisible characters inside a title', () => {
    expect(todoTitleSchema.parse(`Buy${ZERO_WIDTH_SPACE}milk`)).toBe(`Buy${ZERO_WIDTH_SPACE}milk`)
  })

  it.each([FAMILY_EMOJI, RED_HEART_EMOJI])('keeps the emoji %s whole', (emoji) => {
    expect(todoTitleSchema.parse(` Party ${emoji} `)).toBe(`Party ${emoji}`)
  })
})
