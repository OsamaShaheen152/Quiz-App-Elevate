import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json(
      { message: "Unauthorized From client" },
      { status: 401 },
    );
  }

  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/subjects?limit=10&page=${page}`,
    {
      headers: {
        token: token.accessToken,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch diplomas");
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
