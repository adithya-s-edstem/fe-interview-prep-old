import { NavLink } from 'react-router'
import { questionLabel } from './questionLabel'
import { questions } from './questions'

function navLinkClassName({ isActive }: { isActive: boolean }) {
  const base = 'rounded px-2 py-1 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-blue-600'
  return isActive ? `${base} font-semibold text-blue-700` : base
}

export function QuestionNav() {
  return (
    <nav aria-label="Questions" className="mx-auto flex max-w-4xl flex-wrap gap-2 px-4 py-3 text-sm">
      <NavLink to="/" end className={navLinkClassName}>
        Home
      </NavLink>
      {questions.map((question) => (
        <NavLink key={question.path} to={question.path} className={navLinkClassName}>
          {questionLabel(question)}
        </NavLink>
      ))}
    </nav>
  )
}
