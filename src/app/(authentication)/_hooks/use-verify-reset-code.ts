import { verifyResetCode } from "@/lib/apis/password.api";
import { useMutation } from "@tanstack/react-query";

export function useVerifyResetCode() {
  return useMutation({
    mutationFn: async (data: string) => verifyResetCode(data),
  });
}
