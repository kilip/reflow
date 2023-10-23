import { createOctokit } from '../octokit';
import { NextRequest, NextResponse } from 'next/server';
import { GitHubPatchRepoParams } from '../types';

export async function patch(req: NextRequest){
  try{
    const octokit = await createOctokit(req)
    const params: GitHubPatchRepoParams = await req.json()
    const response = await octokit.repos.update(params)
    return NextResponse.json(response, {status: response.status})
  }catch(e: any){
    return NextResponse.json({error: e}, {
      status: e.status,
    })
  }
}
