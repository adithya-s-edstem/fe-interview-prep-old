import { describe, expect, it } from 'vitest'
import { browserHandlers } from './browserHandlers'
import { server } from './server'

function apiUrl(path: string) {
  return new URL(path, window.location.href)
}

describe('browser mock backend', () => {
  it('answers an /api address that has no mock with 404', async () => {
    server.use(...browserHandlers)

    const response = await fetch(apiUrl('/api/no-such-endpoint'), { method: 'POST' })

    expect(response.status).toBe(404)
    expect(await response.json()).toEqual({ message: 'No mock handles POST /api/no-such-endpoint' })
  })

  it('still answers the mocked endpoints', async () => {
    server.use(...browserHandlers)

    const response = await fetch(apiUrl('/api/health'))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})
