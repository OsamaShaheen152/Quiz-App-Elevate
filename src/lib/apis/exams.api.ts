export async function fetchExams(subjectId: string, pageParam?: number) {
  const url = pageParam
    ? `/api/exams/${subjectId}?page=${pageParam}`
    : `/api/exams/${subjectId}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch exams");

  const payload = await response.json();
  return payload;
}
