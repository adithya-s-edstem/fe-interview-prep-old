import { expect, vi } from 'vitest'

const LATE_RESPONSE_GRACE_MILLISECONDS = 200

export async function expectNeverAppears(findElement: () => HTMLElement) {
  const appearance = vi.waitFor(findElement, { timeout: LATE_RESPONSE_GRACE_MILLISECONDS })
  await expect(appearance).rejects.toThrow()
}
