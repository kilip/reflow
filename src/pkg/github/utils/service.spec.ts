import { describe, expect, it, vi } from 'vitest'
import { getGitHubProfile, patch, remove } from './service'
import fetchMock from 'fetch-mock'

describe('gitHubProfile()', () => {
  it('should returns current github profile', async () => {
    const session = {
      profile: {
        name: 'kilip',
      },
    }

    const nextAuth: any = await vi.importActual('next-auth/next')
    nextAuth.getServerSession = vi.fn().mockResolvedValue(session)

    const profile = await getGitHubProfile()
    expect(profile).toEqual(session.profile)
  })
})

describe('remove()', () => {
  it('should request remove from api', async () => {
    const expected = {
      hello: 'world',
    }

    fetchMock.delete(
      {
        url: 'path:/api/github/repo',
        body: {
          full_name: 'kilip/reflow',
        },
      },
      {
        body: expected,
      }
    )

    const response = await remove('kilip/reflow')

    expect(response).toEqual(response)
  })
})

describe('patch()', () => {
  it('should create a patch request to api', async () => {
    const payload = {
      owner: 'kilip',
      repo: 'reflow',
      archived: true,
    }
    const expected = { hello: 'world' }

    fetchMock.patch(
      {
        url: 'path:/api/github/repo',
        body: payload,
      },
      {
        body: expected,
      }
    )

    const response = await patch(payload)

    expect(response).toEqual(expected)
  })
})
