import { DefaultSession, Profile } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    profile: Profile
    user: {
    }& DefaultSession['user']
  }
}

declare module 'next-auth/jwt'{
  interface JWT extends DefaultJWT {
    accessToken?: string
    profile: Profile
  }
}
