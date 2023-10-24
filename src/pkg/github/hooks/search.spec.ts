import { renderHook, waitFor } from '@testing-library/react'
import fetchMock from 'fetch-mock'
import { describe, expect, it } from 'vitest'
import useSearchRepos from './search'
import { wrapper } from 'test/queryClientWrapper'

describe('useSearchRepos()', () => {
  it('should search repos', async () => {
    const expected = { hello: 'world' }
    fetchMock.get(
      {
        url: 'path:/api/github/repo',
      },
      {
        body: expected,
      }
    )

    const { result } = renderHook(() => useSearchRepos(), { wrapper })

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy()
    })

    expect(result.current.data).toEqual(expected)
  })
})
