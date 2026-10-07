export function SearchFailure({ query, onRetry }: { query: string; onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="flex flex-wrap items-center gap-3 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-900"
    >
      <p className="break-words">Couldn&apos;t load results for &apos;{query}&apos;.</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded border border-red-300 bg-white px-3 py-1 text-sm hover:bg-red-100
          focus-visible:outline-2 focus-visible:outline-blue-600"
      >
        Retry
      </button>
    </div>
  )
}
