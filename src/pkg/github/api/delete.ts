import { createOctokit } from '../octokit';
import { NextRequest, NextResponse } from 'next/server';

export default async function deleteRepo(req: NextRequest){
  try{
    const octokit = await createOctokit(req)
    const params = await req.json()

    const [owner,name] = params.full_name.split('/')
    const response = await octokit.repos.delete({
      owner,
      repo: name
    })
    return NextResponse.json(response, {status: response.status})
  }catch(e: any){
    return NextResponse.json({error: e}, {
      status: e.status,
    })
  }
}
