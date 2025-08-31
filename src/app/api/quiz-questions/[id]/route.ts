import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params;

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json(
      { message: "Unauthorized From client" },
      { status: 401 },
    );
  }

  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/questions?exam=${id}`,
    {
      method: "GET",
      headers: {
        token: token.accessToken,
      },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 },
    );
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
