import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitQuiz } from "../_actions/submit-quiz.action";

export function useSubmitQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: submitQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz"] });
    },
  });
}
