import { parsePhoneNumber } from "libphonenumber-js";

export function validatePhoneNumber(phone: string): string | null {
  try {
    const phoneNumber = parsePhoneNumber(phone, "EG"); // Default to Egypt
    const nationalNumber = phoneNumber?.nationalNumber || "";
    return nationalNumber.length === 11 ? nationalNumber : null;
  } catch {
    return null; // Return null if parsing fails
  }
}
