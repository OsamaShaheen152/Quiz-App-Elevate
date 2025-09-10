import { RegisterFormValues } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { register } from "../_actions/register.action";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterFormValues) => register(data),
  });
}
