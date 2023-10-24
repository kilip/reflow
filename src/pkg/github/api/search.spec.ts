import { createMocks } from 'node-mocks-http'
import { describe, it, expect, vi } from 'vitest'
import search from './search'
import { GitHubSearchParams } from '../types'
import { NextResponse } from 'next/server'
import fetchMock from 'fetch-mock'

describe('search()', ()=>{

  it('should returns search', async () => {
    const query = {
      owner: 'user:kilip'
    } as GitHubSearchParams
    const { req } = createMocks({
      url: '/api/search',
      body: query,
      nextUrl: {
        searchParams: new URLSearchParams({
          owner: 'user:kilip'
        })
      }
    })
    req.json = vi.fn().mockResolvedValue(query)
    const resp = {
      total_count: 1,
      incomplete_results: false,
      items: [{hello: 'world'}]
    }


    fetchMock.mock({
      url: 'https://api.github.com/search/repositories',
      query: {
        q: 'user:kilip'
      }
    }, {
      status: 200,
      body: resp
    })

    const response = await search(req)
    const json = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(json.data).toEqual(resp)
  })
})
