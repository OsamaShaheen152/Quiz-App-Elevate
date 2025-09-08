"use server";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

export async function editUserInfo(data: { [key: string]: string }) {
  // Get session
  const session = await getServerSession(authOptions);
  console.log("session is ", session);

  // Get token
  const token = session?.accessToken;
  console.log("token is ", token);

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
