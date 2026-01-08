"use server";

import { ChangePasswordInput } from "@/lib/schemes/auth.schema";
import { getToken } from "@/lib/utils/get-token";

export async function changePassword(data: ChangePasswordInput) {
  // Get jwt
  const jwt = await getToken();

  // Get the token from the jwt
  const token = jwt?.accessToken;

  if (!token || token === "") {
    return JSON.stringify({ message: "Unauthorized From client" });
  }

  // Fetch
  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/changePassword",
    {
      method: "PATCH",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const payload = await response.json();

  return payload;
}
