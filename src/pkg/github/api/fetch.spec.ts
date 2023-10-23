import fetchMock from 'fetch-mock'
import { createMocks } from 'node-mocks-http'
import { describe, it, expect, vi } from 'vitest'
import fetch from './fetch'
import { NextRequest, NextResponse } from 'next/server'

describe('fetch()', () => {

  it('should return repo', async() => {
    const {req} = createMocks({
      url: '/api/github/reflow',
      method: 'GET'
    })

    fetchMock.mock({
      url: 'https://api.github.com/repos/kilip/reflow'
    }, {
      status: 200,
      body: {name: 'test'}
    })

    const jwt: any = await vi.importActual('next-auth/jwt')
    jwt.getToken = vi.fn().mockResolvedValue({ profile: {login: 'kilip'}})

    const response = await fetch(req, {params: {name: 'reflow'}})
    const json = await response.json()

    expect(response).toBeInstanceOf(NextResponse)
    expect(json.data).toEqual({name: 'test'})
  })

})
