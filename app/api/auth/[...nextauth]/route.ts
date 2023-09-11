/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import axios from 'axios';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
          {
            ...credentials,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const user = await response.data;
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/',
  },
  callbacks: {
    async jwt({ token, user }: any) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }: any) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
