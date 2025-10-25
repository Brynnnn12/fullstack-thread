// lib/auth.ts
import NextAuth, { type AuthOptions, type Session, type User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

// Extend the built-in session types
declare module 'next-auth' {
  interface Session {
    backendToken?: string;
  }
  interface User {
    backendToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    backendToken?: string;
    username?: string;
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Di sinilah Anda mendefinisikan SEMUA konfigurasi
export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // 1. Panggil API Login Express
          const loginRes = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!loginRes.ok) {
            return null;
          }

          const loginData = await loginRes.json();
          const token = loginData.data?.token || loginData.token || loginData.accessToken || loginData.jwt;

          // Extract user data from JWT token since backend doesn't provide it
          let user: any;
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            user = {
              id: payload.userId || payload.id,
              email: payload.email,
              username: payload.username || payload.email?.split('@')[0] || 'user',
            };
          } catch (error) {
            return null;
          }

          // 3. Kembalikan data lengkap
          const result = {
            id: user.id || user._id || 'temp-id',
            email: user.email,
            username: user.username || user.name || 'temp-user',
            backendToken: token,
          };
          return result;
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
        token.backendToken = user.backendToken;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.username) {
        session.user.username = token.username as string;
        session.user.email = token.email as string;
      }
      if (token.backendToken) {
        session.backendToken = token.backendToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};