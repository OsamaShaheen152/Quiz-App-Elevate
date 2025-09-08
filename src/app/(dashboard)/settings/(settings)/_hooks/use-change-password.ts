import { ChangePasswordInput } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "../_actions/change-password.action";

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordInput) => changePassword(data),
  });
}
