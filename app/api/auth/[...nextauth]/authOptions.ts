import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import db from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/sign-out",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        login: {
          label: "Username or email",
          type: "text",
          placeholder: "john_doe or john@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.login || !credentials.password) {
          throw new Error("Missing credentials");
        }

        const isEmail = credentials.login.includes("@");

        // check the user in the database by email or username
        const user = await db.user.findUnique({
          where: isEmail
            ? { email: credentials.login }
            : { username: credentials.login },
        });

        if (!user) {
          throw new Error("No user found with the provided credentials");
        }

        const passwordMatch = await compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: String(user.id),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = String(token.id);
      session.user.email = token.email;
      session.user.username = String(token.username);

      return session;
    },
  },
};
