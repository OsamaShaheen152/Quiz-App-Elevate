// Get user info
export async function getUserInfo() {
  const response = await fetch("/api/user-info");
  const payload = await response.json();

  return payload;
}
