import type { UserEvent } from '@testing-library/user-event'
import { typeQuery } from './typeQuery'
import { waitForTypingPause } from './waitForTypingPause'

export async function searchFor(user: UserEvent, text: string) {
  await typeQuery(user, text)
  await waitForTypingPause()
}
