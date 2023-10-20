import { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const AuthOptions: NextAuthOptions = {
  pages: {
    signIn: '/auth/login',
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope: 'user repo delete_repo delete:packages'
        }
      }
    })
  ],
  callbacks: {
    async jwt({token, profile, account, session}){
      if(account){
        token.accessToken = account.access_token
      }

      if(profile){
        token.profile = profile
      }
      return token
    },
    async session({session, token}){
      if(token.profile){
        session.profile = token.profile
      }
      return session
    }
  }
}