import { NextResponse } from "next/server";

export async function GET({ params }: { params: { examId: string } }) {
  const { examId } = params;

  const response = await fetch(
    `https://exam.elevateegy.com/api/v1/questions?exam=${examId}`,
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
