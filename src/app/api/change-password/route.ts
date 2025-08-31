import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  console.log("this is the body from change password:------------ ", body);

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.accessToken) {
    return NextResponse.json(
      { message: "Unauthorized From client" },
      { status: 401 },
    );
  }

  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/changePassword",
    {
      method: "PATCH",
      headers: {
        // Authorization: `Bearer ${token.accessToken}`,
        token: token.accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  const payload = await response.json();

  return NextResponse.json(payload);
}
