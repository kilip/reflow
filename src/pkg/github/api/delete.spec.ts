import fetchMock from 'fetch-mock'
import { createMocks } from 'node-mocks-http'
import { afterEach, describe, expect, it, vi } from 'vitest'
import deleteRepo from './delete'

describe('DELETE /api/github/repo', () => {
  afterEach(() => {
    fetchMock.reset()
  })

  it('should create octokit DELETE repo request', async () => {
    const { req } = createMocks()
    req.json = vi.fn().mockResolvedValue({
      full_name: 'kilip/testing',
    })

    fetchMock.delete(
      {
        url: 'path:/repos/kilip/testing',
      },
      204
    )

    const response = await deleteRepo(req)

    expect(response.ok).toBeTruthy()
  })

  it('should handle octokit response error', async () => {
    const { req } = createMocks()
    req.json = vi.fn().mockResolvedValue({
      full_name: 'kilip/testing',
    })

    fetchMock.delete(
      {
        url: 'path:/repos/kilip/testing',
      },
      () => {
        throw new Error('test error')
      }
    )

    const response = await deleteRepo(req)

    expect(response.ok).toBeFalsy()
    expect(response.status).toBe(500)
  })
})
