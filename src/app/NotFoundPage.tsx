import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Page not found</h1>
      <Link to="/" className="text-blue-700 underline focus-visible:outline-2 focus-visible:outline-blue-600">
        Go to the home page
      </Link>
    </>
  )
}
