import { submitQuiz } from "@/lib/apis/quiz.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSubmitQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
  });
}
