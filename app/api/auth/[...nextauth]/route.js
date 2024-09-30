import NextAuth from 'next-auth';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '../../../lib/db';
import { getServerSession } from 'next-auth';
import Google from 'next-auth/providers/google';

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Optional: Add custom sign-in logic here
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};

const handler = NextAuth(authOptions)

export const getAuthSession = () => getServerSession(authOptions)

export { handler as GET, handler as POST }