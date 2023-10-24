'use client'

import { useEffect, useState } from 'react'
import { useThemeContext } from '@/pkg/ui/contexts/ThemeContext'
import { GitHubSearchItems } from '../types'
import SearchToolbar from './SearchToolbar'
import { useGitHubSearchContext } from '../context/SearchContext'
import RepoList from './repo/RepoList'
import useSearchRepos from '../hooks/search'

export default function Search() {
  const { setLoading } = useThemeContext()
  const { data: response, isLoading } = useSearchRepos()
  const { setTotal } = useGitHubSearchContext()
  const [repositories, setRepositories] = useState<GitHubSearchItems>([])

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading, setLoading])

  useEffect(() => {
    if (response) {
      setRepositories(response.data.items)
      setTotal(response.data.total_count)
    }
  }, [response, setTotal])

  return (
    <div className="flex flex-col w-screen gap-4">
      <SearchToolbar />
      <RepoList repositories={repositories} />
    </div>
  )
}
