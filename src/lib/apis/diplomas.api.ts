export async function fetchDiplomas(pageParam?: number) {
  const response = await fetch(`/api/diplomas?page=${pageParam}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch diplomas");
  }
  const payload = await response.json();
  return payload;
}
