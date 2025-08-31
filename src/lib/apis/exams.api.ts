import { Exam } from "../types/quiz";
import { PaginatedResponse } from "../types/api";

export async function fetchExams(
  subjectId: string,
  pageParam?: number,
): Promise<PaginatedResponse<Exam>> {
  const url = pageParam
    ? `/api/exams/${subjectId}?page=${pageParam}`
    : `/api/exams/${subjectId}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch exams");

  const payload = await response.json();
  return payload;
}
