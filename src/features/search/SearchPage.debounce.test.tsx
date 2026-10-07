import { act, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SEARCH_DEBOUNCE_MILLISECONDS } from './searchDebounceMilliseconds'
import { aProduct } from './test/aProduct'
import { mockProductSearch } from './test/mockProductSearch'
import { productsFound } from './test/productsFound'
import { renderSearchPage } from './test/renderSearchPage'
import { searchFor } from './test/searchFor'
import { shownResultTitles } from './test/shownResultTitles'
import { typeQuery } from './test/typeQuery'
import { waitForTypingPause } from './test/waitForTypingPause'

describe('search page: sending requests', () => {
  it('sends exactly one request, for the whole word, when "react" is typed quickly', async () => {
    const api = mockProductSearch(() => productsFound([aProduct({ title: 'React poster' })]))
    const { user } = renderSearchPage()

    await searchFor(user, 'react')

    expect(await screen.findByRole('heading', { level: 2, name: 'React poster' })).toBeInTheDocument()
    expect(api.searchedQueries).toEqual(['react'])
  })

  it('waits for the user to pause typing before sending a request', async () => {
    const api = mockProductSearch(() => productsFound([]))
    const { user } = renderSearchPage()
    await typeQuery(user, 'react')

    await act(() => vi.advanceTimersByTimeAsync(SEARCH_DEBOUNCE_MILLISECONDS - 1))
    expect(api.searchedQueries).toEqual([])

    await act(() => vi.advanceTimersByTimeAsync(1))
    expect(api.searchedQueries).toEqual(['react'])
  })

  it('sends one request per pause when the user pauses between words', async () => {
    const api = mockProductSearch(() => productsFound([]))
    const { user } = renderSearchPage()

    await searchFor(user, 'red')
    await searchFor(user, ' lipstick')

    expect(api.searchedQueries).toEqual(['red', 'red lipstick'])
  })

  it('searches for the query without its surrounding spaces', async () => {
    const api = mockProductSearch(() => productsFound([]))
    const { user } = renderSearchPage()

    await searchFor(user, '  red  ')

    expect(api.searchedQueries).toEqual(['red'])
  })

  it.each(['', '   '])('sends no request and shows no results for the query %j', async (query) => {
    const api = mockProductSearch(() => productsFound([aProduct()]))
    const { user } = renderSearchPage()

    await searchFor(user, `${query}{Enter}`)

    expect(api.searchedQueries).toEqual([])
    expect(shownResultTitles()).toEqual([])
  })

  it('hides the results as soon as the query is cleared, without a new request', async () => {
    const api = mockProductSearch(() => productsFound([aProduct({ title: 'Red Lipstick' })]))
    const { user } = renderSearchPage()
    await searchFor(user, 'red')
    await screen.findByRole('heading', { level: 2, name: 'Red Lipstick' })

    await user.clear(screen.getByRole('searchbox', { name: 'Search products' }))

    expect(shownResultTitles()).toEqual([])
    await waitForTypingPause()
    expect(shownResultTitles()).toEqual([])
    expect(api.searchedQueries).toEqual(['red'])
  })

  it('keeps the old results hidden when the box is cleared and a new word is typed before the pause', async () => {
    mockProductSearch(() => productsFound([aProduct({ title: 'Phone case' })]))
    const { user } = renderSearchPage()
    await searchFor(user, 'phone')
    await screen.findByRole('heading', { level: 2, name: 'Phone case' })

    await user.clear(screen.getByRole('searchbox', { name: 'Search products' }))
    await typeQuery(user, 'la')

    expect(shownResultTitles()).toEqual([])
  })

  it('searches only the new word when the box is cleared and a new word is typed before the pause', async () => {
    const api = mockProductSearch(() => productsFound([]))
    const { user } = renderSearchPage()
    await searchFor(user, 'phone')

    await user.clear(screen.getByRole('searchbox', { name: 'Search products' }))
    await searchFor(user, 'la')

    expect(api.searchedQueries).toEqual(['phone', 'la'])
  })
})
