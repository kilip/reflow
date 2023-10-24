import { createMocks, createRequest } from 'node-mocks-http'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import search from './search'
import { GitHubSearchParams } from '../types'
import { NextRequest, NextResponse } from 'next/server'
import fetchMock from 'fetch-mock'

describe('search()', () => {
  beforeEach(async () => {
    const session = {
      profile: {
        login: 'kilip',
      },
    }

    const nextAuth: any = await vi.importActual('next-auth/next')
    nextAuth.getServerSession = vi.fn().mockResolvedValue(session)
  })

  it('should returns search', async () => {
    const query = {
      owner: '',
    } as GitHubSearchParams
    const { req } = createMocks({
      url: '/api/search',
      body: query,
      nextUrl: {
        searchParams: new URLSearchParams({
          owner: '',
        }),
      },
    })
    req.json = vi.fn().mockResolvedValue(query)
    const resp = {
      total_count: 1,
      incomplete_results: false,
      items: [{ hello: 'world' }],
    }

    fetchMock.mock(
      {
        url: 'path:/search/repositories',
        query: {
          q: 'user:kilip',
        },
      },
      {
        status: 200,
        body: resp,
      }
    )

    const response = await search(req)
    const json = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(json.data).toEqual(resp)
    fetchMock.reset()
  })

  it('handles octokit error response', async () => {
    const { req } = createMocks({})
    req.nextUrl = {
      searchParams: new URLSearchParams({ owner: '' }),
    }
    fetchMock.get(
      {
        url: 'path:/search/repositories',
        query: {
          q: 'user:kilip',
        },
      },
      () => {
        throw new Error('test error')
      }
    )

    const response = await search(req)
    const json = await response.json()

    expect(response.ok).toBeFalsy()
    expect(response.status).toBe(500)
    expect(json.error.name).toEqual('HttpError')
  })
})
