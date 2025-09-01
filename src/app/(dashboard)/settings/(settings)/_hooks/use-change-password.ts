import { changePassword } from "@/lib/apis/password.api";
import { ChangePasswordInput } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => changePassword(data),
  });
}
