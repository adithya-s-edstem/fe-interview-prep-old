import type { Question } from './Question'
import { QuestionPage } from './QuestionPage'

export function QuestionPlaceholderPage({ question }: { question: Question }) {
  return (
    <QuestionPage question={question}>
      <p className="text-slate-600">This question has not been built yet.</p>
    </QuestionPage>
  )
}
