import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/lib/apis/password.api";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (email: string) => forgotPassword(email),
  });
}
