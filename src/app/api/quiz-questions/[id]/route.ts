import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/questions?exam=${id}`,
    {
      method: "GET",
      headers: {
        token: process.env.TOKEN!,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
