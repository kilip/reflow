import NextAuth from 'next-auth'
import { AuthOptions } from '@/pkg/auth/options'

const handler = NextAuth(AuthOptions)

export {
  handler as GET,
  handler as POST
}