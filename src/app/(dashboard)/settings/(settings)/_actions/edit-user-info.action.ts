"use server";

import { getToken } from "@/lib/utils/get-token";

export async function editUserInfo(data: { [key: string]: string }) {
  // Get jwt
  const jwt = await getToken();

  // Get token from jwt
  const token = jwt?.accessToken;

  if (!token) {
    return JSON.stringify({ message: "Unauthorized From client" });
  }

  // Fetch
  const response = await fetch(
    "https://exam.elevateegy.com/api/v1/auth/editProfile",
    {
      method: "PUT",
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
