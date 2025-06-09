import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";
import jwt from "jsonwebtoken";

const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        try {
          await fetch(`${process.env.SERVER_URI}/api/users/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: user.name, email: user.email }),
          });
        } catch (err) {
          console.log(err);
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = jwt.sign(
        token,
        process.env.NEXTAUTH_SECRET || "hello_world"
      );
      return session;
    },
  },
};

export default authOptions;
