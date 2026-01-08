import { RegisterFormValues } from "@/lib/schemes/auth.schema";

export async function register(data: RegisterFormValues) {
  // Send the user data to the api
  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  // Check Errors
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Registration failed: ${errorData.message || response.statusText}`,
    );
  }

  const payload = await response.json();

  return payload;
}
