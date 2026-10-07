import type { ReactNode } from 'react'
import { PageTitle } from './PageTitle'
import type { Question } from './Question'
import { questionLabel } from './questionLabel'

export function QuestionPage({ question, children }: { question: Question; children: ReactNode }) {
  const label = questionLabel(question)

  return (
    <>
      <PageTitle pageName={label} />
      <h1 className="mb-4 text-2xl font-bold">{label}</h1>
      {children}
    </>
  )
}
