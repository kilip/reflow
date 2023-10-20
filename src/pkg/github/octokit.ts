import { getToken } from 'next-auth/jwt'
import { NextApiRequest } from 'next'
import { Octokit } from '@octokit/rest'

export async function useOctokit(req: NextApiRequest){
  const token = await getToken({req})
  return new Octokit({
    auth: token?.accessToken
  })
}