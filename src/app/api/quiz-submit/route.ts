import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const submition = await request.json();

  const res = await fetch(
    "https://exam.elevateegy.com/api/v1/questions/check",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submition),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to submit quiz");
  }

  const payload = await res.json();
  return NextResponse.json(payload);
}
