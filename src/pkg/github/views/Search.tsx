'use client'

import SearchToolbar from './SearchToolbar'
import RepoList from './repo/RepoList'
import useSearchRepos from '../hooks/search'

export default function Search() {
  const { data: response, isLoading } = useSearchRepos()
  const repositories = response ? response.data.items : []
  const total = response ? response.data.total_count : 0

  return (
    <div className="flex flex-col w-screen items-center gap-4 relative">
      <div className="flex w-full justify-center z-10 absolute">
        <SearchToolbar total={total} loading={isLoading} />
      </div>
      <div className="flex mt-28">
        <RepoList loading={isLoading} repositories={repositories} />
      </div>
    </div>
  )
}
