"use server";
import { QuizResult, QuizSubmission } from "@/lib/types/quiz";
import { getToken } from "@/lib/utils/get-token";

export async function submitQuiz(data: QuizSubmission): Promise<QuizResult> {
  // Get token
  const jwt = await getToken();
  const token = jwt?.accessToken;

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

    return JSON.stringify({
      error: "Failed to submit quiz",
      details: errorText,
    }) as unknown as QuizResult;
  }

  const payload = await res.json();

  return payload;
}
