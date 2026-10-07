import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { aProduct } from './test/aProduct'
import { expectNeverAppears } from './test/expectNeverAppears'
import { heldResponse } from './test/heldResponse'
import { mockProductSearch } from './test/mockProductSearch'
import { productsFound } from './test/productsFound'
import { renderSearchPage } from './test/renderSearchPage'
import { searchFor } from './test/searchFor'
import { shownResultTitles } from './test/shownResultTitles'
import { typeQuery } from './test/typeQuery'

describe('search page: the latest query wins', () => {
  it('keeps the newer results on screen when an older response arrives late', async () => {
    const olderResponse = heldResponse()
    mockProductSearch((query) =>
      query === 'red' ? olderResponse.response : productsFound([aProduct({ title: 'Red Lipstick' })]),
    )
    const { user } = renderSearchPage()
    await searchFor(user, 'red')
    await searchFor(user, ' lip')
    await screen.findByRole('heading', { level: 2, name: 'Red Lipstick' })

    olderResponse.release(productsFound([aProduct({ title: 'Red Nail Polish' })]))

    await expectNeverAppears(() => screen.getByRole('heading', { level: 2, name: 'Red Nail Polish' }))
    expect(shownResultTitles()).toEqual(['Red Lipstick'])
  })

  it('cancels the older request once a newer query is searched', async () => {
    const olderResponse = heldResponse()
    const api = mockProductSearch((query) => (query === 'red' ? olderResponse.response : productsFound([])))
    const { user } = renderSearchPage()

    await searchFor(user, 'red')
    await searchFor(user, ' lip')

    expect(api.cancelledQueries).toEqual(['red'])
  })

  it('shows loading rather than an error when a cancelled query is searched again', async () => {
    mockProductSearch(() => heldResponse().response)
    const { user } = renderSearchPage()
    await searchFor(user, 'red')

    await user.clear(screen.getByRole('searchbox', { name: 'Search products' }))
    await typeQuery(user, 'red')

    await expectNeverAppears(() => screen.getByRole('alert'))
    expect(screen.getByRole('status')).toHaveTextContent("Searching for 'red'…")
  })

  it('cancels the request and updates nothing when the user leaves the page mid-request', async () => {
    const pendingResponse = heldResponse()
    const api = mockProductSearch(() => pendingResponse.response)
    const consoleError = vi.spyOn(console, 'error')
    const { user } = renderSearchPage()
    await searchFor(user, 'red')

    await user.click(screen.getByRole('link', { name: 'Home' }))
    pendingResponse.release(productsFound([aProduct({ title: 'Red Lipstick' })]))
    await expectNeverAppears(() => screen.getByRole('heading', { level: 2, name: 'Red Lipstick' }))

    expect(api.cancelledQueries).toEqual(['red'])
    expect(screen.getByRole('heading', { level: 1, name: 'Frontend interview prep' })).toBeInTheDocument()
    expect(consoleError).not.toHaveBeenCalled()
  })
})
