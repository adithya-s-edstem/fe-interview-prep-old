import { Link } from 'react-router'
import { PageTitle } from './PageTitle'

const PAGE_NAME = 'Page not found'

export function NotFoundPage() {
  return (
    <>
      <PageTitle pageName={PAGE_NAME} />
      <h1 className="mb-4 text-2xl font-bold">{PAGE_NAME}</h1>
      <Link to="/" className="text-blue-700 underline focus-visible:outline-2 focus-visible:outline-blue-600">
        Go to the home page
      </Link>
    </>
  )
}
