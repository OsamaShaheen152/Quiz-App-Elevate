import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") || 1;

  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/subjects?limit=10&page=${page}`,
    {
      headers: {
        token: process.env.TOKEN!,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch diplomas");
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
