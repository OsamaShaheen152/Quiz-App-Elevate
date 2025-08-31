import { ChangePasswordInput } from "../schemes/auth.schema";

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

// Change Password
export async function changePassword(data: ChangePasswordInput) {
  console.log(data);
  const response = await fetch("/api/change-password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "accept-language": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to Updata Password!!!!");
  }

  const payload = response.json();

  return payload;
}
