import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("Body from user edit info route ----------------:", body);

  if (!token?.accessToken) {
    return NextResponse.json(
      { message: "Unauthorized From client" },
      { status: 401 },
    );
  }

  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/editProfile",
    {
      method: "PUT",
      headers: {
        token: token.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const payload = await response.json();
  return NextResponse.json(payload, { status: response.status });
}
