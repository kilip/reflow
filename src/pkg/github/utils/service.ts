import { getServerSession } from 'next-auth'
import {
  GitHubPatchRepoParams,
  GitHubPatchResponse,
  GitHubUser,
} from '../types'
import { AuthOptions } from '@/pkg/auth/options'
import { GitHubDeleteRepoResponse } from '../types'
import { api } from '@/pkg/utils/fetch'

export async function getGitHubProfile(): Promise<GitHubUser> {
  const session = await getServerSession(AuthOptions)
  return session?.profile as GitHubUser
}

export async function remove(
  repoFullName: string
): Promise<GitHubDeleteRepoResponse> {
  return await api<GitHubDeleteRepoResponse>('/api/github/repo', {
    method: 'DELETE',
    body: JSON.stringify({
      full_name: repoFullName,
    }),
  })
}

export async function patch(
  payload: GitHubPatchRepoParams
): Promise<GitHubPatchResponse> {
  return await api<GitHubPatchResponse>('/api/github/repo', {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
    },
  })
}
