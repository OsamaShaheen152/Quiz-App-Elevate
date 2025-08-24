import { RegisterFormValues } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      const response = await fetch(
        "https://exam.elevateegy.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      return response.json();
    },
  });
}
