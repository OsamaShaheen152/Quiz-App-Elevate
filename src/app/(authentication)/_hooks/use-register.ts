import { RegisterFormValues } from "@/lib/types/auth";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: async (data: RegisterFormValues) => {
      console.log(data);
      const response = await fetch(
        "https://exam.elevateegy.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "accept-language": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const payload = response.json();
      return payload;
    },
  });
}
