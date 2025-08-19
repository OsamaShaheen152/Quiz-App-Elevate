import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const protectedRoutes = ["/settings"];

// Redirect to login page
function redirectToLogin(req: NextRequest) {
  const url = new URL("/login", req.nextUrl.origin);

  return NextResponse.redirect(url);
}

// Middleware function
export default async function middleware(req: NextRequest) {
  //
  // The secret is optional if you are using NEXTAUTH_SECRET naming convintion
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (!token) {
      return redirectToLogin(req);
    }

    return NextResponse.next();
  }
}
