const SPACE_OR_INVISIBLE_CHARACTER = String.raw`[\s\u200B-\u200F\u2060]`
const SURROUNDING_SPACES_AND_INVISIBLE_CHARACTERS = new RegExp(
  `^${SPACE_OR_INVISIBLE_CHARACTER}+|${SPACE_OR_INVISIBLE_CHARACTER}+$`,
  'gu',
)

export function trimSpacesAndInvisibleCharacters(text: string) {
  return text.replace(SURROUNDING_SPACES_AND_INVISIBLE_CHARACTERS, '')
}
