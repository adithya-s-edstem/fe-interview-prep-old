import { describe, expect, it } from 'vitest'

function apiUrl(path: string) {
  return new URL(path, window.location.href)
}

describe('mock backend', () => {
  it('answers the health check', async () => {
    const response = await fetch(apiUrl('/api/health'))

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ status: 'ok' })
  })
})
