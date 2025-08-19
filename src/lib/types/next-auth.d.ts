// import NextAuth from "next-auth";
// import { JWT } from "next-auth/jwt"

import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    accessToken: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Session extends Omit<User, "accessToken"> {}
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
