"use server";

// Verify reset code
export async function verifyResetCode(data: string) {
  console.log("Data in verify reset code action: ", {
    resetCode: data,
  });

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

    console.error("Error response:", errorData);
    console.error("Error response:", errorData.message);

    throw new Error("Failed to verify reset code!!!!");
  }

  const payload = await response.json();

  return payload;
}
