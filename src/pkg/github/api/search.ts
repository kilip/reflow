import { createOctokit } from '../octokit'
import { NextRequest, NextResponse } from 'next/server'
import {
  GitHubEnumArchived,
  GitHubEnumVisibility,
  GitHubSearchParams,
} from '../types'
import { Endpoints } from '@octokit/types'
import { getGitHubProfile } from '@/pkg/github/utils/service'

type OctokitSearchParams = Endpoints['GET /search/repositories']['parameters']

async function createSearchParams(
  params: GitHubSearchParams | any
): Promise<OctokitSearchParams> {
  // setting minimal q with "user:login"
  if (params.owner == '') {
    params.owner = 'user:' + (await getGitHubProfile()).login
  }

  const { owner, keyword, sort, order, per_page, page, visibility, archived } =
    params

  const queries: string[] = []

  if ('' !== keyword) queries.push(keyword)
  if (GitHubEnumVisibility.undefined !== visibility) queries.push(visibility)
  if (GitHubEnumArchived.undefined !== archived) queries.push(archived)
  queries.push(owner)

  return {
    q: queries.join(' ').trim(),
    sort,
    order,
    per_page,
    page,
  }
}

export default async function search(req: NextRequest) {
  const octokit = await createOctokit(req)
  const params = Object.fromEntries(req.nextUrl.searchParams)
  const searchParams = await createSearchParams(params)

  try {
    const response = await octokit.search.repos(searchParams)
    return NextResponse.json(response)
  } catch (e: any) {
    return NextResponse.json(
      {
        error: {
          ...e,
        },
      },
      {
        status: e.status,
      }
    )
  }
}
