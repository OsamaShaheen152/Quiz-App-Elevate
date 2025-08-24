"use client";

import ExamApp from "@/components/shared/ExamApp";
import { GraduationCap, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardAside() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [
    {
      href: "/diplomas",
      label: "Diplomas",
      icon: <GraduationCap />,
    },
    {
      href: "/settings",
      label: "Account Settings",
      icon: <UserRound />,
    },
  ];

  return (
    <aside className="w-80  bg-blue-50 p-4 h-screen fixed">
      <Image
        src={"assets/images/Final Logo 1.svg"}
        alt="Logo"
        width={192}
        height={37}
      />

      <ExamApp />

      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-2 mb-4 h-14 pl-4 cursor-pointer  outline-blue-300 ${
                  pathname === link.href
                    ? "bg-blue-100 border border-blue-300"
                    : ""
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <Image
          src={"assets/images/avatar.svg"}
          className="border-2 border-blue-600 "
          alt="Logo"
          width={54}
          height={54}
        />
        <div className="flex flex-col ">
          <span className="text-sm text-blue-600">{session?.username}</span>
          <span className="text-sm">{session?.email}</span>
        </div>
      </div>
    </aside>
  );
}
