import { Fragment } from 'react'
import { highlightMatches } from './highlightMatches'

export function HighlightedText({ text, query }: { text: string; query: string }) {
  return highlightMatches(text, query).map((part, index) =>
    part.isMatch ? (
      <mark key={index} className="rounded-sm bg-yellow-200 px-0.5 text-inherit">
        {part.text}
      </mark>
    ) : (
      <Fragment key={index}>{part.text}</Fragment>
    ),
  )
}
