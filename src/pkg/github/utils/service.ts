import { getServerSession } from 'next-auth'
import { GitHubPatchRepoParams, GitHubPatchResponse, GitHubUser } from '../types'
import { AuthOptions } from '@/pkg/auth/options'
import { GitHubDeleteRepoResponse } from '../types'
import { requestError } from '@/pkg/utils/error'
import { QueryClient } from '@tanstack/react-query'

export async function getGitHubProfile(): Promise<GitHubUser> {
  const session = await getServerSession(AuthOptions)
  return session?.profile as GitHubUser
}

export async function remove(repoFullName: string): Promise<GitHubDeleteRepoResponse>{
  const response = await fetch('/api/github/repo', {
    method: 'DELETE',
    body: JSON.stringify({
      full_name: repoFullName
    })
  })
  return await response.json()
}

export async function patch(payload: GitHubPatchRepoParams): Promise<GitHubPatchResponse>{
  const response = await fetch('/api/github/repo', {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Accept': 'application/json'
    }
  })
  if(response.ok){
    return await response.json()
  }

  throw requestError(response)
}

export async function invalidateQueries(queryKey: string){
  const qc = new QueryClient()

  qc.invalidateQueries({
    queryKey: [queryKey]
  })
}
