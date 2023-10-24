import { describe, expect, it } from 'vitest'
import { api } from './fetch'
import fetchMock from 'fetch-mock'

describe('fetch()', () => {
  it('should fetch request', async () => {
    fetchMock.get('path:/some/api', {
      status: 200,
      body: { hello: 'world' },
    })

    const data = await api('/some/api', {
      method: 'GET',
    })

    expect(data).toEqual({ hello: 'world' })

    fetchMock.reset()
  })

  it('throws FetchError during failed response', async () => {
    fetchMock.get('path:/test', () => {
      return new Response(JSON.stringify({ hello: 'world' }), {
        status: 500,
        statusText: 'Server down',
      })
    })

    expect(api('/test')).rejects.toThrowError()

    fetchMock.reset()
  })
})
