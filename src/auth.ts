import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginResponse } from "./lib/types/auth";
import { ApiResponse } from "./lib/types/api";

declare module "next-auth" {
  interface Session {
    _id?: string;
    username?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    role?: string;
    isVerified?: boolean;
  }
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },

  providers: [
    // Credentials
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Authorize
      authorize: async (credentials) => {
        const response = await fetch(process.env.SIGN_IN_API!, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Data
        const data: ApiResponse<LoginResponse> = await response.json();
        if ("code" in data) {
          throw new Error(data.message);
        }

        return {
          id: data.user._id,
          ...data.user,
          accessToken: data.token, // This will be set as the `accessToken` property on the User object
        };
      },
    }),
  ],

  // Callbacks
  callbacks: {
    // JWT
    jwt: ({ token, user }) => {
      if (user) {
        token = {
          ...user,
        };
      }
      return token;
    },

    // Session
    session: ({ session, token }) => {
      session = {
        // this to destructure the old data in the session and then override the properties you want to adjust down
        ...session,
        _id: token._id,
        username: token.username,
        firstname: token.firstname,
        lastname: token.lastname,
        email: token.email || "",
        phone: token.phone,
        role: token.role,
        isVerified: token.isVerified,
      };

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },

  // Secret
  secret: process.env.NEXTAUTH_SECRET,
};
