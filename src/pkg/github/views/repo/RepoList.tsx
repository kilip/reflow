'use client'
import { GitHubSearchItems } from '../../types'
import RepoCard from './RepoCard'

type Props = {
  repositories: GitHubSearchItems
}

export default function RepoList({repositories}: Props) {
  return (
    <div className='flex flex-wrap gap-4 items-start justify-center'>
      {repositories.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
        />
      ))}
    </div>
  )
}
