import { register } from "@/lib/apis/auth.api";
import { RegisterFormValues } from "@/lib/schemes/auth.schema";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterFormValues) => register(data),
  });
}
