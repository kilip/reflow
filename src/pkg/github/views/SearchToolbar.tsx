'use client'

import { useGitHubSearchContext } from '../context/SearchContext'
import Pagination from '@/pkg/ui/views/Pagination'
import { useCallback, useState } from 'react'
import { MdOutlineFilterAlt, MdSearch } from 'react-icons/md'
import SearchFilters from './SearchFilters'
import classNames from 'classnames'
import useScreenType from '@/pkg/ui/hooks/screen'

export default function SearchToolbar({
  loading,
  total,
}: {
  loading: boolean
  total: number
}) {
  const { setPage, page, per_page, keyword, setKeyword } =
    useGitHubSearchContext()

  const [search, setSearch] = useState(keyword)
  const [showFilter, setShowFilter] = useState(false)
  const screenType = useScreenType()

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

  const handleShowFilter = useCallback(() => {
    setShowFilter(!showFilter)
  }, [showFilter, setShowFilter])

  const handleReset = useCallback(() => {
    setKeyword('')
    setSearch('')
    setPage(1)
  }, [setKeyword, setSearch, setPage])

  const handleApplyFilter = useCallback(() => {
    setKeyword(search)
    setPage(1)
  }, [setKeyword, search, setPage])

  return (
    <div
      className={classNames({
        'flex flex-col bg-white rounded-lg drop-shadow-lg': true,
        'p-2 gap-2 w-full lg:w-3/4': true,
        'duration-300': true,
      })}>
      {/* search */}
      <div className="join w-full">
        <input
          name="keyword"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input input-bordered input-sm join-item focus:outline-none w-full"
          placeholder="type here to search"
          accessKey="s"
          onKeyDown={(e) => handleKeyDown(e)}
          value={search}
        />
        <button
          className="join-item btn btn-sm border-slate-400"
          onClick={handleSearch}>
          <MdSearch />
        </button>
      </div>

      {/* navigation */}
      <div className="flex gap-2">
        <Pagination
          onPageChanged={onPageChanged}
          perPage={per_page}
          total={total}
          currentPage={page}
          loading={loading}
        />
        <button
          className="join-item btn btn-sm border-slate-400"
          onClick={() => handleShowFilter()}>
          <MdOutlineFilterAlt className="w-4 h-4" />
          <span
            className={classNames({
              hidden: screenType.isMedium || screenType.isSmall,
            })}>
            Filters
          </span>
        </button>
      </div>

      {/* filters */}
      <div
        className={classNames({
          hidden: !showFilter,
          'max-w-full duration-1000': true,
        })}
        onMouseLeave={() => handleShowFilter()}>
        <SearchFilters onReset={handleReset} onApply={handleApplyFilter} />
      </div>
    </div>
  )
}
