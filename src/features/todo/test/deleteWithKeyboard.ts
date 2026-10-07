import { screen } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'

export async function deleteWithKeyboard(user: UserEvent, title: string) {
  screen.getByRole('button', { name: `Delete ${title}` }).focus()
  await user.keyboard('{Enter}')
}
