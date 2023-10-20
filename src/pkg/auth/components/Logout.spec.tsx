import { describe, it, expect, vi } from 'vitest'
import Logout from './Logout'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'


describe('<Logout/>', () => {

  it('should handle logout properly', async() => {
    const auth:any = await vi.importActual('next-auth/react')
    auth.signOut = vi.fn().mockReturnValue({})

    render(<Logout/>)
    fireEvent.click(screen.getByText('Logout'))

    expect(auth.signOut).toHaveBeenCalled()
  })
})