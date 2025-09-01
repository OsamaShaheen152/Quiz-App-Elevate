"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogOutBtn() {
  return (
    <Button
      className="flex w-5/6 items-center justify-start"
      variant="danger"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <span className="rotate-180">
        <LogOut />
      </span>
      Logout
    </Button>
  );
}
