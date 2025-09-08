"use server";

import { authOptions } from "@/auth";
import { ChangePasswordInput } from "@/lib/schemes/auth.schema";
import { getServerSession } from "next-auth";

export async function changePassword(data: ChangePasswordInput) {
  console.log("data is ", data);

  // Get the session
  const session = await getServerSession(authOptions);
  console.log("session is  ", session);

  // Get the token from the session
  const token = session?.accessToken;
  console.log("token is  ", token);

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
