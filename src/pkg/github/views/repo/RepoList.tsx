'use client'
import { useThemeContext } from '@/pkg/ui/contexts/ThemeContext'
import { GitHubSearchItems } from '../../types'
import RepoCard from './RepoCard'

type Props = {
  repositories: GitHubSearchItems
  loading: boolean
}

export default function RepoList({ repositories, loading }: Props) {
  if (loading) {
    return <></>
  }

  return (
    <div className="flex flex-wrap gap-4 items-start justify-center w-full">
      {repositories.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}
