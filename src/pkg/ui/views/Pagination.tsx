import classNames from 'classnames'
import { useEffect, useState } from 'react'
import {
  MdFirstPage,
  MdNavigateBefore,
  MdNavigateNext,
  MdLastPage,
} from 'react-icons/md'
import useScreenType from '../hooks/screen'

interface Props {
  total: number
  perPage: number
  loading?: boolean
  currentPage?: number
  onPageChanged: (page: number) => void
}

export default function Pagination({
  total,
  onPageChanged,
  perPage,
  loading,
  currentPage,
}: Props) {
  const screenType = useScreenType()
  const [page, setPage] = useState(1)
  const [numPage, setNumPage] = useState(0)
  const [pageNumbers, setPageNumbers] = useState([])

  const buttonStyle = {
    'join-item btn btn-sm btn-square': true,
  }
  if (!loading) {
    loading = false
  }

  const goToPage = (page: number) => {
    setPage(page)
    onPageChanged(page)
  }

  useEffect(() => {
    setNumPage(Math.ceil(total / perPage))
    const pNums = []
    const start = page < 5 ? 1 : Math.floor(page / 5) * 5
    const end = start + 4
    for (let i = start; i <= end; i++) {
      if (i <= numPage) {
        pNums.push(i)
      }
    }
    setPageNumbers(pNums as any)
  }, [total, perPage, numPage, page, setPageNumbers])

  useEffect(() => {
    if (currentPage) {
      setPage(currentPage)
    }
  }, [currentPage])

  return (
    <div className="join">
      <button
        className={classNames(buttonStyle)}
        disabled={page == 1 || loading}
        onClick={() => goToPage(1)}>
        <MdFirstPage />
      </button>
      <button
        className={classNames(buttonStyle)}
        disabled={page == 1 || loading}
        onClick={() => goToPage(page - 1)}>
        <MdNavigateBefore />
      </button>
      {/* paged ranges */}
      {!screenType.isSmall &&
        pageNumbers.map((num, index) => (
          <button
            key={index}
            className={classNames({
              ...buttonStyle,
              'bg-slate-300': num == page,
              'overflow-hidden': true,
              hidden: screenType.isSmall,
            })}
            onClick={() => goToPage(num)}>
            {num}
          </button>
        ))}
      <button
        className={classNames(buttonStyle)}
        disabled={page == numPage || page + 1 > numPage || loading}
        onClick={() => goToPage(page + 1)}>
        <MdNavigateNext />
      </button>
      <button
        className={classNames(buttonStyle)}
        disabled={page == numPage || numPage > 1 || loading}
        onClick={() => goToPage(numPage)}>
        <MdLastPage />
      </button>
      {!loading && (
        <div
          className={classNames({
            'join-item text text-sm bg-gray-200': true,
            hidden: loading,
          })}>
          <span className="flex h-full px-2 items-center font-bold">
            {screenType.isSmall && `Page ${page} of `}
            {total} items
          </span>
        </div>
      )}
    </div>
  )
}
