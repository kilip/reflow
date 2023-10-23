import { NextRequest, NextResponse } from 'next/server';
import { createOctokit } from '../octokit';
import { JWT, getToken } from 'next-auth/jwt';
import { GitHubUser } from '../types';

export default async function fetch(req: NextRequest, {params}: {params: {name: string}}) {
  const {profile} = await getToken({req}) as JWT
  const octokit = await createOctokit(req)
  try{
    const response = await octokit.repos.get({
      owner: (profile as GitHubUser).login,
      repo: params.name
    })
    return NextResponse.json(response)
  }catch(e: any){
    return NextResponse.json({error: e}, {
      status: e.status,
    })
  }
}
