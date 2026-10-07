import { Link } from 'react-router'
import { APP_NAME } from './appName'
import { questionLabel } from './questionLabel'
import { questions } from './questions'

export function HomePage() {
  return (
    <>
      <title>{APP_NAME}</title>
      <h1 className="mb-6 text-2xl font-bold">{APP_NAME}</h1>
      <ul className="grid gap-3 sm:grid-cols-2">
        {questions.map((question) => (
          <li key={question.path}>
            <Link
              to={question.path}
              className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-blue-400
                focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {questionLabel(question)}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
