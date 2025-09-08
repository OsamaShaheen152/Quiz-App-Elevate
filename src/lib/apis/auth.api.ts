import { RegisterFormValues } from "../schemes/auth.schema";

export async function register(data: RegisterFormValues) {
  console.log("Registering user with data:", data);

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
    console.error("Error response:", errorData);
    throw new Error(
      `Registration failed: ${errorData.message || response.statusText}`,
    );
  }

  const payload = await response.json();

  return payload;
}
