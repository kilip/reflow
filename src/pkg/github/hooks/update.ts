import { GitHubPatchRepoResponse } from '../types'

export default async function update(owner: string, repo: string, payload: any): Promise<GitHubPatchRepoResponse>{
  const response = await fetch('/api/github', {
    method: 'PATCH',
    body: JSON.stringify({
      owner,
      repo,
      ...payload
    })
  })
  return await response.json()
}
