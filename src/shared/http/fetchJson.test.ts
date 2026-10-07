import { http, HttpResponse } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../../mocks/server'
import { fetchJson } from './fetchJson'
import { HttpError } from './HttpError'

const THINGS_URL = new URL('https://api.example.test/things')

function answerThings(response: Response) {
  server.use(http.get(THINGS_URL.href, () => response))
}

describe('fetchJson', () => {
  it('resolves with the parsed JSON body of a successful response', async () => {
    answerThings(HttpResponse.json({ things: ['a', 'b'] }))

    const body = await fetchJson(THINGS_URL, { signal: new AbortController().signal })

    expect(body).toEqual({ things: ['a', 'b'] })
  })

  it('rejects with the status when the server answers with an error', async () => {
    answerThings(HttpResponse.json({ message: 'down' }, { status: 503 }))

    const request = fetchJson(THINGS_URL, { signal: new AbortController().signal })

    await expect(request).rejects.toThrow(HttpError)
    await expect(request).rejects.toMatchObject({ status: 503 })
  })

  it('rejects with an abort error when the request is cancelled', async () => {
    answerThings(HttpResponse.json({ things: [] }))
    const controller = new AbortController()
    controller.abort()

    const request = fetchJson(THINGS_URL, { signal: controller.signal })

    await expect(request).rejects.toMatchObject({ name: 'AbortError' })
  })
})
