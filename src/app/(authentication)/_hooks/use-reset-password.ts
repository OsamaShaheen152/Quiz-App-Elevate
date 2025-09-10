import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../_actions/reset-password.action";

export function useResetPassword() {
  return useMutation({
    mutationFn: (data: { email: string; newPassword: string }) =>
      resetPassword(data),
  });
}
