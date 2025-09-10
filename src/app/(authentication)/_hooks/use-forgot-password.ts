import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../_actions/forgot-password.action";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}
