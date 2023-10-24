import { NextResponse } from 'next/server';

/**
 * @throws Error
 */
export function invalidContextUse(context: string, provider: string): Error {
  return new Error(
    `${context} must be used within ${provider}`
  )
}

export function requestError(response: Response) {
  return new Error (
    `${response.status} ${response.statusText}`
  )
}
