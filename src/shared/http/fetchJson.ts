import { HttpError } from './HttpError'

export async function fetchJson(url: URL, { signal }: { signal: AbortSignal }): Promise<unknown> {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new HttpError(url, response.status)
  }
  return response.json()
}
