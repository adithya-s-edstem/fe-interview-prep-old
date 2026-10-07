import userEvent from '@testing-library/user-event'
import { renderAppAt } from '../../../test/renderAppAt'

export function renderTodoPage() {
  const user = userEvent.setup()
  const page = renderAppAt('/todo')
  return { user, page }
}
