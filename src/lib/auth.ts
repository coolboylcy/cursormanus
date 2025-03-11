import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import { randomBytes } from "crypto"

// 生成随机用户名
const generateGuestName = () => {
  const adjectives = ["Happy", "Lucky", "Sunny", "Clever", "Bright", "Swift", "Kind", "Cool"]
  const nouns = ["Panda", "Tiger", "Dragon", "Phoenix", "Unicorn", "Dolphin", "Fox", "Bear"]
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)]
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)]
  const randomNum = Math.floor(Math.random() * 1000)
  return `${randomAdjective}${randomNoun}${randomNum}`
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        }
      },
    }),
    CredentialsProvider({
      id: "guest",
      name: "Guest Access",
      credentials: {},
      async authorize() {
        try {
          const guestUser = {
            id: randomBytes(16).toString("hex"),
            name: generateGuestName(),
            email: `guest_${Date.now()}@temp.cursormanus.app`,
            image: `https://api.dicebear.com/7.x/bottts/svg?seed=${Date.now()}`,
            isGuest: true,
          }

          // 创建临时用户记录
          const user = await prisma.user.create({
            data: {
              id: guestUser.id,
              name: guestUser.name,
              email: guestUser.email,
              image: guestUser.image,
              emailVerified: new Date(), // 添加必要的字段
            },
          })

          // 1小时后删除用户
          setTimeout(async () => {
            try {
              await prisma.user.delete({
                where: { id: user.id },
              })
            } catch (error) {
              console.error("Error deleting temporary user:", error)
            }
          }, 60 * 60 * 1000)

          return guestUser
        } catch (error) {
          console.error("Error creating guest user:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!user) return false
      if (account?.provider === "github" || account?.provider === "guest") {
        return true
      }
      return false
    },
    async session({ token, session }: any) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.isGuest = token.isGuest
      }
      return session
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.isGuest = (user as any).isGuest
      }
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
  },
} 