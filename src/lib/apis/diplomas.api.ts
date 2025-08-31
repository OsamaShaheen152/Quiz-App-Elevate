import { PaginatedResponse } from "../types/api";

// Assuming diplomas are subjects - you may need to create a proper type for this
interface Subject {
  _id: string;
  name: string;
  // Add other subject properties as needed
}

export async function fetchDiplomas(
  pageParam?: number,
): Promise<PaginatedResponse<Subject>> {
  const response = await fetch(`/api/diplomas?page=${pageParam}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch diplomas");
  }
  const payload = await response.json();
  return payload;
}
