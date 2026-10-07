import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { aProduct } from './test/aProduct'
import { mockProductSearch } from './test/mockProductSearch'
import { productsFound } from './test/productsFound'
import { renderSearchPage } from './test/renderSearchPage'
import { searchFor } from './test/searchFor'

function highlightedTextIn(element: HTMLElement) {
  return within(element)
    .queryAllByRole('mark')
    .map((mark) => mark.textContent)
}

describe('search page: highlighting matches', () => {
  it('highlights the query in each result title and description, whatever its case', async () => {
    mockProductSearch(() =>
      productsFound([aProduct({ title: 'Red Lipstick', description: 'A bold red for your lips. RED!' })]),
    )
    const { user } = renderSearchPage()

    await searchFor(user, 'rEd')

    const result = (await screen.findByRole('heading', { level: 2, name: 'Red Lipstick' })).closest('li')
    expect(result).not.toBeNull()
    expect(highlightedTextIn(result as HTMLElement)).toEqual(['Red', 'red', 'RED'])
  })

  it('shows markup inside a result as plain text instead of rendering it', async () => {
    const title = '<img src="x" onerror="alert(1)"> Red <b>bold</b>'
    mockProductSearch(() => productsFound([aProduct({ title })]))
    const { user } = renderSearchPage()

    await searchFor(user, 'red')

    expect(await screen.findByRole('heading', { level: 2, name: title })).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(document.querySelector('b')).toBeNull()
  })
})
