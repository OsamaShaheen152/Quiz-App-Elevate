import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log("Subject ID from API Route:", id);
  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/exams?subject=${id}`,
    {
      headers: {
        token: process.env.TOKEN!,
      },
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch exams" },
      { status: 500 }
    );
  }

  const payload = await response.json();

  return NextResponse.json(payload);
}
