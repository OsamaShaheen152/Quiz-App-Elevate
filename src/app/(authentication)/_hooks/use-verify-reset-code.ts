import { useMutation } from "@tanstack/react-query";
import { verifyResetCode } from "../_actions/verify-reset-code.action";

export function useVerifyResetCode() {
  return useMutation({
    mutationFn: async (data: string) => verifyResetCode(data),
  });
}
