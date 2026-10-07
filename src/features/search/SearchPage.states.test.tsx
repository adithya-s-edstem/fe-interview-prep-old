import { HttpResponse } from 'msw'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { aProduct } from './test/aProduct'
import { heldResponse } from './test/heldResponse'
import { mockProductSearch } from './test/mockProductSearch'
import { productsFound } from './test/productsFound'
import { renderSearchPage } from './test/renderSearchPage'
import { searchFor } from './test/searchFor'
import { shownResultTitles } from './test/shownResultTitles'

const SEARCH_FAILED_MESSAGE = "Couldn't load results for 'red'."

describe('search page: result states', () => {
  it('invites the user to type before anything is searched', () => {
    mockProductSearch(() => productsFound([]))

    renderSearchPage()

    expect(screen.getByText('Type to search products.')).toBeInTheDocument()
  })

  it('shows a loading state while the request is in flight, then the results', async () => {
    const pendingResponse = heldResponse()
    mockProductSearch(() => pendingResponse.response)
    const { user } = renderSearchPage()

    await searchFor(user, 'red')
    expect(screen.getByRole('status')).toHaveTextContent("Searching for 'red'…")

    pendingResponse.release(productsFound([aProduct({ title: 'Red Lipstick' })]))
    expect(await screen.findByRole('heading', { level: 2, name: 'Red Lipstick' })).toBeInTheDocument()
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('shows each result with its title and description', async () => {
    mockProductSearch(() =>
      productsFound([
        aProduct({ title: 'Red Lipstick', description: 'A classic, bold lipstick.' }),
        aProduct({ title: 'Red Nail Polish', description: 'A glossy polish.' }),
      ]),
    )
    const { user } = renderSearchPage()

    await searchFor(user, 'red')

    expect(await screen.findByText('A classic, bold lipstick.')).toBeInTheDocument()
    expect(shownResultTitles()).toEqual(['Red Lipstick', 'Red Nail Polish'])
  })

  it('names the query when nothing matches it', async () => {
    mockProductSearch(() => productsFound([]))
    const { user } = renderSearchPage()

    await searchFor(user, 'xyz')

    expect(await screen.findByText("No results for 'xyz'")).toBeInTheDocument()
    expect(shownResultTitles()).toEqual([])
  })

  it('shows an error with a Retry action when the search fails', async () => {
    mockProductSearch(() => HttpResponse.json({ message: 'Server error' }, { status: 500 }))
    const { user } = renderSearchPage()

    await searchFor(user, 'red')

    expect(await screen.findByRole('alert')).toHaveTextContent(SEARCH_FAILED_MESSAGE)
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })

  it('shows an error when the network is unreachable', async () => {
    mockProductSearch(() => HttpResponse.error())
    const { user } = renderSearchPage()

    await searchFor(user, 'red')

    expect(await screen.findByRole('alert')).toHaveTextContent(SEARCH_FAILED_MESSAGE)
  })

  it('shows an error when the response is not a list of products', async () => {
    mockProductSearch(() => HttpResponse.json({ items: 'unexpected' }))
    const { user } = renderSearchPage()

    await searchFor(user, 'red')

    expect(await screen.findByRole('alert')).toHaveTextContent(SEARCH_FAILED_MESSAGE)
  })

  it('repeats the same query straight away when Retry is pressed', async () => {
    const answers = [
      HttpResponse.json({ message: 'Server error' }, { status: 500 }),
      productsFound([aProduct({ title: 'Red Lipstick' })]),
    ]
    const api = mockProductSearch(() => answers.shift() ?? productsFound([]))
    const { user } = renderSearchPage()
    await searchFor(user, 'red')

    await user.click(await screen.findByRole('button', { name: 'Retry' }))

    expect(await screen.findByRole('heading', { level: 2, name: 'Red Lipstick' })).toBeInTheDocument()
    expect(api.searchedQueries).toEqual(['red', 'red'])
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('moves focus to the search box when Retry is pressed, since the button goes away', async () => {
    mockProductSearch(() => HttpResponse.json({ message: 'Server error' }, { status: 500 }))
    const { user } = renderSearchPage()
    await searchFor(user, 'red')

    await user.click(await screen.findByRole('button', { name: 'Retry' }))

    expect(screen.getByRole('searchbox', { name: 'Search products' })).toHaveFocus()
  })
})
