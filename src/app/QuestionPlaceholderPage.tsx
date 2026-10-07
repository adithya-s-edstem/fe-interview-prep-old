import type { Question } from './Question'
import { questionLabel } from './questionLabel'

export function QuestionPlaceholderPage({ question }: { question: Question }) {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">{questionLabel(question)}</h1>
      <p className="text-slate-600">This question has not been built yet.</p>
    </>
  )
}
