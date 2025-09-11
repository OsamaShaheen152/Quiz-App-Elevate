"use server";
import { getToken } from "@/lib/utils/get-token";

export async function deleteAccount() {
  // Get jwt
  const jwt = await getToken();

  //Get token from jwt
  const token = jwt?.accessToken;

  if (!token || token === "") {
    return { message: "Unauthorized From client" };
  }

  try {
    const response = await fetch(
      "https://exam.elevateegy.com/api/v1/auth/deleteMe",
      {
        method: "DELETE",
        headers: {
          token: token,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete account");
    }
    const payload = await response.json();

    return {
      success: true,
      message: "Account deleted successfully",
      data: payload,
    };
  } catch (error) {
    void error;
    return { success: false, message: "Error deleting account" };
  }
}
