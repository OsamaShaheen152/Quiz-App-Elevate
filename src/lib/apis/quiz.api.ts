import { QuizApiResponse, QuizResult, QuizSubmission } from "../types/quiz";

// todo: What is the purpose of the promise
const API_BASE_URL = "http://localhost:3000";

// Todo: Implement fetchQuizQuestions
export async function fetchQuizQuestions(
  examId: string
): Promise<QuizApiResponse> {
  const res = await fetch(`${API_BASE_URL}/api/quiz-questions/${examId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await res.json();

  return data;
}

// Todo: Submit quiz answers
export async function submitQuiz(
  submission: QuizSubmission
): Promise<QuizResult> {
  const response = await fetch(`${API_BASE_URL}/api/quiz-submit`, {
    method: "POST",
    headers: {
      token: process.env.TOKEN!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error("Failed to submit quiz");
  }

  return response.json();
}
