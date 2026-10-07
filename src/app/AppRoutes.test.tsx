import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderAppAt } from '../test/renderAppAt'
import { questionLabel } from './questionLabel'
import { questions } from './questions'

const questionPages = [
  { label: 'Q1 Todo App', path: '/todo' },
  { label: 'Q2 Live Search', path: '/search' },
  { label: 'Q3 Registration Wizard', path: '/register' },
  { label: 'Q4 Data Table', path: '/table' },
  { label: 'Q5 Login & Session Handling', path: '/auth' },
]

function questionLinksOnHomePage() {
  return within(screen.getByRole('main')).getAllByRole('link')
}

describe('app routes', () => {
  it('shows a home page linking to every question', () => {
    renderAppAt('/')

    const links = questionLinksOnHomePage().map((link) => ({
      label: link.textContent,
      path: link.getAttribute('href'),
    }))

    expect(links).toEqual(questionPages)
  })

  it.each(questionPages)('opens the $label page when its home link is followed', async ({ label }) => {
    renderAppAt('/')

    await userEvent.click(within(screen.getByRole('main')).getByRole('link', { name: label }))

    expect(screen.getByRole('heading', { level: 1, name: label })).toBeInTheDocument()
  })

  it.each(questionPages)('shows the $label page inside the shared layout', ({ label, path }) => {
    renderAppAt(path)

    const navigation = within(screen.getByRole('banner')).getByRole('navigation')
    expect(within(screen.getByRole('main')).getByRole('heading', { level: 1, name: label })).toBeInTheDocument()
    expect(within(navigation).getAllByRole('link').map((link) => link.getAttribute('href'))).toEqual([
      '/',
      ...questionPages.map((page) => page.path),
    ])
  })

  it.each(questions)('serves the page for $title at the path the question list gives it', (question) => {
    renderAppAt(question.path)

    expect(screen.getByRole('heading', { level: 1, name: questionLabel(question) })).toBeInTheDocument()
  })

  it('keeps every address under /auth on the login and session question', () => {
    renderAppAt('/auth/login')

    expect(screen.getByRole('heading', { level: 1, name: 'Q5 Login & Session Handling' })).toBeInTheDocument()
  })

  it.each(['/no-such-page', '/todo/extra'])('shows a not-found page for the unknown address %s', (path) => {
    renderAppAt(path)

    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  })

  it('returns home from the not-found page', async () => {
    renderAppAt('/no-such-page')

    await userEvent.click(within(screen.getByRole('main')).getByRole('link', { name: 'Go to the home page' }))

    expect(questionLinksOnHomePage()).toHaveLength(questionPages.length)
  })
})
