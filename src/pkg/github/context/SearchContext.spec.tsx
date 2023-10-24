import { describe, expect, it, vi } from 'vitest'
import { GitHubSearchProvider, useGitHubSearchContext } from './SearchContext'
import { getNodeText, render, screen } from '@testing-library/react'
import {
  GitHubEnumArchived,
  GitHubEnumSortOrder,
  GitHubEnumVisibility,
  GitHubSearchParams,
} from '../types'
import { useEffect, useState } from 'react'
import { invalidContextUse } from '@/pkg/utils/error'

const TestComponent = ({
  customParams,
}: {
  customParams: GitHubSearchParams
}) => {
  const { setArchived, queryParams, setOwner } = useGitHubSearchContext()
  const tests = Object.entries(queryParams)

  useEffect(() => {
    setArchived(customParams.archived)
    setOwner(customParams.owner)
  }, [customParams, setArchived, setOwner])

  return (
    <>
      {tests.map((value) => (
        <span data-testid={value[0]} key={value[0]}>
          {value[1]}
        </span>
      ))}
    </>
  )
}

describe('SearchContext', () => {
  const params: GitHubSearchParams = {
    keyword: 'keyword',
    owner: 'user:kilip',
    sort: 'updated',
    order: GitHubEnumSortOrder.asc,
    page: 1,
    per_page: 10,
    visibility: GitHubEnumVisibility.private,
    archived: GitHubEnumArchived.true,
  }

  it('should handle search states', async () => {
    render(
      <GitHubSearchProvider>
        <TestComponent customParams={params} />
      </GitHubSearchProvider>
    )

    const owner = await screen.findByTestId('owner')
    expect(getNodeText(owner)).toBe('user:kilip')
  })

  it('throws exception when using context outside GitHubSearchProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => null)
    const error = invalidContextUse(
      'useGitHubSearchContext',
      'GitHubSearchProvider'
    )
    expect(() => render(<TestComponent customParams={params} />)).toThrowError(
      error.message
    )
  })
})
