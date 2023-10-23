import { useMutation } from '@tanstack/react-query'
import { GitHubDeleteRepoResponse } from '../types'

export default async function deleteRepo(repoFullName: string): Promise<GitHubDeleteRepoResponse>{
  const response = await fetch('/api/github', {
    method: 'DELETE',
    body: JSON.stringify({
      full_name: repoFullName
    })
  })
  return await response.json()
}
