import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'

//vi.mock('next-auth/react')

describe('<Login/>', () => {

  it('should rendered properly', async () => {
    const nextAuth: any = await vi.importActual('next-auth/react')
    nextAuth.signIn = vi.fn().mockReturnValue({})

    render(<Login/>)
    expect(screen.getByText('GitHub')).toBeDefined()
    fireEvent.click(screen.getByRole('button'))
    
    expect(nextAuth.signIn).toHaveBeenCalled()
    expect(nextAuth.signIn).toHaveBeenCalledWith('github', {redirect: true, callbackUrl: '/dashboard'})
  })
})