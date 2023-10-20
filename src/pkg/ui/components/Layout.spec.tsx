import { render } from '@testing-library/react'
import { describe, it } from 'vitest'
import Layout from './Layout'

describe('<Layout/>', () => {
  
  it('should render with default layout', () => {
    render(<Layout/>)
  })
})