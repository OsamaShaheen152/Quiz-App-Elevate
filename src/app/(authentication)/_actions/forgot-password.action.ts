"use server";

// Forgot Password
export async function forgotPassword(email: string) {
  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/forgotPassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept-language": "application/json",
      },
      body: JSON.stringify({ email }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to send password reset email!!!!");
  }

  const data = await response.json();
  return data;
}
