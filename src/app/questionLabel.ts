import type { Question } from './Question'

export function questionLabel(question: Question) {
  return `Q${String(question.number)} ${question.title}`
}
