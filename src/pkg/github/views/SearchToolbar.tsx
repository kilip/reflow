'use client'

import { useGitHubSearchContext } from '../context/SearchContext'
import Pagination from '@/pkg/ui/views/Pagination'
import { useState } from 'react'
import { MdSearch } from 'react-icons/md'
import {
  GitHubEnumArchived,
  GitHubEnumSortOrder,
  GitHubEnumVisibility,
} from '../types'
import useSearchRepos from '../hooks/search'

export default function SearchToolbar({
  loading,
  total,
}: {
  loading: boolean
  total: number
}) {
  const { data: response } = useSearchRepos()
  const {
    setPage,
    page,
    per_page,
    keyword,
    setKeyword,
    visibility,
    setVisibility,
    archived,
    setArchived,
    sort,
    setSort,
    order,
    setOrder,
  } = useGitHubSearchContext()

  const [search, setSearch] = useState(keyword)

  const onPageChanged = (newPage: number) => {
    setPage(newPage)
  }

  const handleSearch = () => {
    setKeyword(search)
    setPage(1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      handleSearch()
    }
  }

  const handleChange = (key: string, newValue: string) => {
    if (key === 'visibility') setVisibility(newValue as GitHubEnumVisibility)
    if (key === 'archived') setArchived(newValue as GitHubEnumArchived)
    if (key === 'sort') setSort(newValue)
    if (key === 'order') setOrder(newValue as GitHubEnumSortOrder)

    setPage(1)
  }

  return (
    <div className="flex flex-col bg-white p-2 rounded-lg drop-shadow-lg gap-2">
      {/* filters */}
      <div className="flex flex-wrap gap-2">
        {/* search */}
        <div className="join">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="input input-bordered input-sm join-item focus:outline-none"
            placeholder="type here to search"
            accessKey="s"
            onKeyDown={(e) => handleKeyDown(e)}
          />
          <button
            className="join-item btn btn-sm border-slate-400"
            onClick={handleSearch}>
            <MdSearch />
          </button>
        </div>

        {/* visibility */}
        <div className="form-control w-full max-w-xs">
          <select
            id="visibility"
            onChange={(e) => handleChange('visibility', e.target.value)}
            value={visibility}
            className="select select-bordered select-sm focus:outline-none">
            <option value={GitHubEnumVisibility.undefined}>all</option>
            <option value={GitHubEnumVisibility.public}>public</option>
            <option value={GitHubEnumVisibility.private}>private</option>
          </select>
          <label className="label" htmlFor="visibility">
            <span className="label-text-alt text-sm">
              filter repo visibility
            </span>
          </label>
        </div>

        {/* archived */}
        <div className="form-control w-full max-w-xs">
          <select
            id="archived"
            onChange={(e) => handleChange('archived', e.target.value)}
            value={archived}
            className="select select-bordered select-sm focus:outline-none">
            <option value={GitHubEnumArchived.undefined}>all</option>
            <option value={GitHubEnumArchived.true}>archived</option>
            <option value={GitHubEnumArchived.false}>unarchived</option>
          </select>
          <label className="label" htmlFor="archived">
            <span className="label-text-alt text-sm">
              Filter archived/unarchived repo
            </span>
          </label>
        </div>

        {/* sort */}
        <div className="form-control w-full max-w-xs">
          <select
            id="sort"
            onChange={(e) => handleChange('sort', e.target.value)}
            value={sort}
            className="select select-bordered select-sm focus:outline-none">
            <option value="updated">updated</option>
            <option value="name">name</option>
          </select>
          <label className="label" htmlFor="sort">
            <span className="label-text-alt text-sm">sort repository</span>
          </label>
        </div>

        {/* order */}
        <div className="form-control w-full max-w-xs">
          <select
            id="order"
            onChange={(e) => handleChange('order', e.target.value)}
            value={order}
            className="select select-bordered select-sm focus:outline-none">
            <option value={GitHubEnumSortOrder.asc}>Ascending</option>
            <option value={GitHubEnumSortOrder.desc}>Descending</option>
          </select>
          <label className="label" htmlFor="order">
            <span className="label-text-alt text-sm">sort order</span>
          </label>
        </div>
      </div>

      {/* navigation */}
      <div className="flex">
        <Pagination
          onPageChanged={onPageChanged}
          perPage={per_page}
          total={total}
          currentPage={page}
          loading={loading}
        />
      </div>
    </div>
  )
}
