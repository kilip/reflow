'use client'

import SearchToolbar from './SearchToolbar'
import RepoList from './repo/RepoList'
import useSearchRepos from '../hooks/search'

export default function Search() {
  const { data: response, isLoading } = useSearchRepos()
  const repositories = response ? response.data.items : []
  const total = response ? response.data.total_count : 0

  return (
    <div className="flex flex-col w-screen gap-4">
      <SearchToolbar loading={isLoading} total={total} />
      <RepoList loading={isLoading} repositories={repositories} />
    </div>
  )
}
