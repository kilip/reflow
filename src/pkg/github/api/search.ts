import { NextApiRequest } from 'next'
import { createOctokit } from '../octokit'
import { GitHubSearchParams } from '../types'
import { NextRequest, NextResponse } from 'next/server'

export default async function search(req: NextRequest){
  const octokit = await createOctokit(req)
  const params = await req.json()
  try{
    const response = await octokit.search.repos(params)
    return NextResponse.json(response)
  }catch(e: any){
    return NextResponse.json({error: e}, {
      status: e.status,
    })
  }
}
