import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // This is a mock implementation. In a real app, check against a database.
        // We'll simulate finding a user from localStorage or a shared state if possible,
        // but NextAuth runs on the server. For now, let's allow any valid lookin email/pass.
        
        if (credentials?.email && credentials?.password) {
          // Mock successful login
          return {
            id: "1",
            name: "Vandana",
            email: credentials.email,
            college: "PVPSIT",
            joinedDate: "March 2026"
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        ;(token as any).id = user.id
        ;(token as any).college = (user as any).college
        ;(token as any).joinedDate = (user as any).joinedDate
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        (session.user as any).college = token.college
        (session.user as any).joinedDate = token.joinedDate
      }
      return session
    }
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-dev-only",
})

export { handler as GET, handler as POST }
