import { SetStateAction, useEffect, useState } from 'react'
import { useGitHubSearchContext } from '../context/SearchContext'
import {
  GitHubEnumArchived,
  GitHubEnumSortOrder,
  GitHubEnumVisibility,
} from '../types'
import InlineRadio from '@/pkg/ui/components/InlineRadio'

type Props = {
  onReset: () => void
  onApply: () => void
}
export default function SearchFilters({ onReset, onApply }: Props) {
  const {
    visibility,
    archived,
    sort,
    order,
    setVisibility,
    setArchived,
    setSort,
    setOrder,
    setPage,
  } = useGitHubSearchContext()

  const [_visibility, _svisibility] = useState(GitHubEnumVisibility.undefined)
  const [_archived, _sarchived] = useState(GitHubEnumArchived.undefined)
  const [_sort, _ssort] = useState<string>('updated')
  const [_order, _sorder] = useState(GitHubEnumSortOrder.desc)

  useEffect(() => {
    _svisibility(visibility)
    _sarchived(archived)
    _ssort(sort as string)
    _sorder(order)
  }, [sort, visibility, archived, order])

  const applyFilter = () => {
    setVisibility(_visibility)
    setArchived(_archived)
    setSort(_sort)
    setOrder(_order)
    onApply()
  }
  const resetFilter = () => {
    setVisibility(GitHubEnumVisibility.undefined)
    setArchived(GitHubEnumArchived.undefined)
    setSort('updated')
    setOrder(GitHubEnumSortOrder.desc)
    onReset()
  }

  return (
    <div className="flex flex-col flex-wrap gap-2">
      {/* visibility */}
      <div className="flex flex-col w-full max-w-xs text-sm">
        <InlineRadio
          label="Sort"
          name="sort"
          value={_sort}
          options={[
            { label: 'updated', value: 'updated' },
            { label: 'name', value: 'name' },
          ]}
          onChange={(newVal) => _ssort(newVal as string)}
        />
        <InlineRadio
          label="Sort Order"
          name="order"
          value={_order}
          options={[
            { label: 'ascending', value: GitHubEnumSortOrder.asc },
            { label: 'descending', value: GitHubEnumSortOrder.desc },
          ]}
          onChange={(newVal) => _sorder(newVal as GitHubEnumSortOrder)}
        />
        <InlineRadio
          label="Visibility"
          name="visibility"
          value={_visibility}
          options={[
            { label: 'all', value: GitHubEnumVisibility.undefined },
            { label: 'public', value: GitHubEnumVisibility.public },
            { label: 'private', value: GitHubEnumVisibility.private },
          ]}
          onChange={(newVal) => _svisibility(newVal as GitHubEnumVisibility)}
        />
        <InlineRadio
          label="Archive"
          name="archive"
          value={_archived}
          options={[
            { label: 'all', value: GitHubEnumArchived.undefined },
            { label: 'unarchived', value: GitHubEnumArchived.false },
            { label: 'archived', value: GitHubEnumArchived.true },
          ]}
          onChange={(newVal) => _sarchived(newVal as GitHubEnumArchived)}
        />
      </div>

      {/* actions */}
      <div className="flex gap-2">
        <button
          className="btn btn-sm btn-success"
          onClick={() => applyFilter()}>
          Apply
        </button>
        <button className="btn btn-sm btn-error" onClick={() => resetFilter()}>
          Reset
        </button>
      </div>
    </div>
  )
}
