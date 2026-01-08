import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Protected routes that require authentication
const publicRoutes = ["/login", "/register", "/forgot-password"];

// Redirect to login page
function redirectToLogin(req: NextRequest) {
  const url = new URL("/login", req.nextUrl.origin);

  return NextResponse.redirect(url);
}

// Middleware function
export default async function middleware(req: NextRequest) {
  // The secret is optional if you are using NEXTAUTH_SECRET naming convention
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!publicRoutes.includes(req.nextUrl.pathname) && !token) {
    return redirectToLogin(req);
  }

  if (publicRoutes.includes(req.nextUrl.pathname) && token) {
    const url = new URL("/exams", req.nextUrl.origin);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
