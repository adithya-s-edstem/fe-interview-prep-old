import { screen } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'

export async function typeQuery(user: UserEvent, text: string) {
  await user.type(screen.getByRole('searchbox', { name: 'Search products' }), text)
}
