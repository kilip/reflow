import { createMocks } from 'node-mocks-http'
import { describe, it, expect, vi } from 'vitest'
import { createOctokit } from './octokit'
import { Octokit } from '@octokit/rest'
import { NextRequest } from 'next/server'

describe('useOctokit', () => {
  it('should create octokit with token', async () => {
    const token = {
      accessToken: 'some-token',
    }
    const jwt: any = await vi.importActual('next-auth/jwt')
    jwt.getToken = vi.fn().mockResolvedValue(token)
    const { req } = createMocks<NextRequest>({
      url: 'http://test.com',
    })

    const octokit = await createOctokit(req)

    expect(jwt.getToken).toHaveBeenCalledOnce()
    expect(octokit).toBeInstanceOf(Octokit)
  })
})
