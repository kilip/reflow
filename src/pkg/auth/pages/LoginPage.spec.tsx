import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import LoginPage from './LoginPage'
import { UI } from '@/pkg/ui/ui'
import { ThemeLayout } from '@/pkg/ui/types'

describe('<LoginPage/>', () => {

  it('should rendered properly', async () => {
    const jsx = await LoginPage()
    render(jsx)

    expect(UI.layout).toBe(ThemeLayout.full)
    expect(screen.getByText('GitHub')).toBeDefined()
  })

})