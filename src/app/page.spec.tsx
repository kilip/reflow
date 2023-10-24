import { describe, expect, it, vi } from 'vitest'
import Home from './page'

vi.mock('next/navigation')
describe('Home()', () => {
  it('should redirect page to /dashboard', async () => {
    const next = await import('next/navigation')
    next.redirect = (
      await vi.importActual<typeof import('next/navigation')>('next/navigation')
    ).redirect

    next.redirect = vi.fn()

    Home()
    expect(next.redirect).toBeCalledWith('/dashboard')
  })
})
