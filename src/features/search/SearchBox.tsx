import { useId, type Ref } from 'react'

export function SearchBox({
  text,
  onChange,
  inputRef,
}: {
  text: string
  onChange: (text: string) => void
  inputRef: Ref<HTMLInputElement>
}) {
  const inputId = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputId} className="text-sm font-medium">
        Search products
      </label>
      <input
        ref={inputRef}
        id={inputId}
        type="search"
        value={text}
        onChange={(event) => {
          onChange(event.target.value)
        }}
        placeholder="Try 'phone' or 'red'"
        autoComplete="off"
        className="rounded border border-slate-300 px-3 py-2 focus-visible:outline-2 focus-visible:outline-blue-600"
      />
    </div>
  )
}
