import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const submission = await req.json();
    console.log("Incoming submission:", submission);

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "Unauthorized From client" },
        { status: 401 },
      );
    }

    const res = await fetch(
      "https://exam.elevateegy.com/api/v1/questions/check",
      {
        method: "POST",
        headers: {
          token: token.accessToken,
          "Content-Type": "application/json",
          "accept-language": "application/json",
          // Accept: "application/json",
        },
        body: JSON.stringify(submission),
      },
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("External API error:", res.status, errorText);
      return NextResponse.json(
        { error: "Failed to submit quiz", details: errorText },
        { status: res.status },
      );
    }

    const payload = await res.json();

    return NextResponse.json(payload);
  } catch (err: unknown) {
    console.error("Route handler crashed:", err);

    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Unknown error occurred" },
      { status: 500 },
    );
  }
}
