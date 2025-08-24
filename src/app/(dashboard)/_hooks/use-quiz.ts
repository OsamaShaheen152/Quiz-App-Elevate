import { fetchQuizQuestions } from "@/lib/apis/quiz.api";
import { useQuery } from "@tanstack/react-query";

export function useQuiz(examId: string) {
  return useQuery({
    queryKey: ["quiz", examId],
    queryFn: () => fetchQuizQuestions(examId),
    enabled: !!examId,
  });
}
