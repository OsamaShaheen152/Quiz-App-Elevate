import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const submition = await request.json();
    console.log("Incoming submission:", submition);

    const res = await fetch(
      "https://exam.elevateegy.com/api/v1/questions/check",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.TOKEN!}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submition),
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("External API error:", res.status, errorText);
      return NextResponse.json(
        { error: "Failed to submit quiz", details: errorText },
        { status: res.status }
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
      { status: 500 }
    );
  }
}
