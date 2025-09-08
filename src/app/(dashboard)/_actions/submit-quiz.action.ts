"use server";
import { authOptions } from "@/auth";
import { QuizResult, QuizSubmission } from "@/lib/types/quiz";
import { getServerSession } from "next-auth";

export async function submitQuiz(data: QuizSubmission): Promise<QuizResult> {
  // Get session
  const session = await getServerSession(authOptions);
  console.log("session is ", session);

  // Get token
  const token = session?.accessToken;

  // Check the token
  if (!token) {
    return JSON.stringify({
      message: "Unauthorized From client",
    }) as unknown as QuizResult;
  }

  // Fetch
  const res = await fetch(
    "https://exam.elevateegy.com/api/v1/questions/check",
    {
      method: "POST",
      headers: {
        token: token,
        "Content-Type": "application/json",
        "accept-language": "application/json",
        // Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  // Check the response
  if (!res.ok) {
    const errorText = await res.text();
    console.error("External API error:", res.status, errorText);

    return JSON.stringify({
      error: "Failed to submit quiz",
      details: errorText,
    }) as unknown as QuizResult;
  }

  const payload = await res.json();

  return payload;
}
