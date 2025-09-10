"use server";

export async function resetPassword(data: {
  email: string;
  newPassword: string;
}) {
  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "accept-language": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to reset password!!!!");
  }

  const payload = await response.json();

  return payload;
}
