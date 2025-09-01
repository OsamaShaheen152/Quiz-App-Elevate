// Get user info
export async function getUserInfo() {
  const response = await fetch("/api/user-info");
  const payload = await response.json();

  return payload;
}

// Edit user info
export async function editUserInfo(userInfo: { [key: string]: string }) {
  const response = await fetch("/api/edit-user-info", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "accept-language": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const payload = await response.json();
  return payload;
}
