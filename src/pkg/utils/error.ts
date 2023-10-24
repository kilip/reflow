import { NextResponse } from 'next/server'

export function invalidContextUse(context: string, provider: string): Error {
  return new Error(`${context} must be used within ${provider}`)
}
