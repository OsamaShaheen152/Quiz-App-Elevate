"use server";

// Verify reset code
export async function verifyResetCode(data: string) {
  // Send the user data to the api
  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/verifyResetCode",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept-language": "application/json",
      },
      body: JSON.stringify({
        resetCode: data,
      }),
    },
  );

  // Check Errors
  if (!response.ok) {
    const errorData = await response.json();

    void errorData;

    throw new Error("Failed to verify reset code!!!!");
  }

  const payload = await response.json();

  return payload;
}
