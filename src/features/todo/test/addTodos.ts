import { screen } from '@testing-library/react'
import type { UserEvent } from '@testing-library/user-event'

export async function addTodos(user: UserEvent, titles: string[]) {
  for (const title of titles) {
    await user.type(screen.getByRole('textbox', { name: 'New todo' }), title)
    await user.click(screen.getByRole('button', { name: 'Add todo' }))
  }
}
