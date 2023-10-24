import fetchMock from 'fetch-mock'
import { createMocks } from 'node-mocks-http'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { patch } from './patch'

describe('PATCH /api/github/repo', () => {
  afterEach(() => {
    fetchMock.reset()
  })

  it('should make octokit patch requests', async () => {
    const expected = { name: 'testing' }
    const payload = {
      owner: 'kilip',
      repo: 'testing',
      archived: true,
    }
    const { req } = createMocks()
    req.json = vi.fn().mockResolvedValue(payload)

    fetchMock.patch(
      {
        url: 'path:/repos/kilip/testing',
        body: { archived: true },
      },
      {
        body: expected,
      }
    )

    const response = await patch(req)

    const json = await response.json()

    expect(json.data).toEqual(expected)
  })

  it('should handle octokit error response', async () => {
    const payload = {
      owner: 'kilip',
      repo: 'testing',
      archived: true,
    }
    const { req } = createMocks()
    req.json = vi.fn().mockResolvedValue(payload)

    fetchMock.patch(
      {
        url: 'path:/repos/kilip/testing',
        body: { archived: true },
      },
      () => {
        throw new Error('test error')
      }
    )

    const response = await patch(req)
    const json = await response.json()

    expect(response.ok).toBeFalsy()
    expect(response.status).toBe(500)
    expect(json.error.name).toEqual('HttpError')
  })
})
