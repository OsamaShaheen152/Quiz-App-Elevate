import { redirect } from "next/navigation";

export default function SettingsPage() {
  redirect("/profile");
  return <div></div>;
}
