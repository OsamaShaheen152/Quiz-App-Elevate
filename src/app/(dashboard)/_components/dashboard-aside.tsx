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

  // async function getExams() {
  //   try {
  //     const response = await fetch("https://exam.elevateegy.com/api/v1/exams", {
  //       method: "GET",
  //       headers: {
  //         token:
  //           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NjZkNjk0Y2MzZGViYTYwZDA0Yjc4OCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzU1MzU0MTE3fQ.9okzQ3M0TbmJi-jVYad-GZHULv_WBk9dlfNl3ldvw1k",
  //       },
  //     });

  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  // getExams();

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
            <li
              key={link.href}
              className={`flex items-center gap-2 mb-4 h-14 pl-4 cursor-pointer ${
                pathname === link.href ? "bg-blue-100 border-blue-100" : ""
              }`}
            >
              {link.icon}
              <Link href={link.href}>{link.label}</Link>
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
