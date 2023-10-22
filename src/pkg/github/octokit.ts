import { getToken } from 'next-auth/jwt'
import { Octokit } from '@octokit/rest'
import { NextRequest } from 'next/server'

export async function createOctokit(req: NextRequest){
  const token = await getToken({req})
  return new Octokit({
    auth: token?.accessToken
  })
}
