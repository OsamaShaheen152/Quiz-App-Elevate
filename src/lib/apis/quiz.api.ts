import { QuizApiResponse } from "../types/quiz";

// const API_BASE_URL = "http://localhost:3000" ;

// Todo: Implement fetchQuizQuestions
export async function fetchQuizQuestions(
  examId: string,
): Promise<QuizApiResponse> {
  const res = await fetch(`/api/quiz-questions/${examId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch questions");
  }

  const data = await res.json();

  return data;
}
