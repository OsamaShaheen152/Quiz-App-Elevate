import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json(
      { message: "Unauthorized From client" },
      { status: 401 },
    );
  }

  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/profileData",
    {
      method: "GET",
      headers: {
        token: token.accessToken,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Something went wrong from client side");
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
