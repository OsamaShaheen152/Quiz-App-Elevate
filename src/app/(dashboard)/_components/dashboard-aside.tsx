"use client";

import ExamApp from "@/components/shared/ExamApp";
import { EllipsisVertical, GraduationCap, UserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DropdownBtns from "./dropdown-btns";

export default function DashboardAside() {
  // State
  const [showDropdownBtns, setShowDropdownBtns] = useState(false);

  // Hooks
  const pathName = usePathname();
  const { data: session } = useSession();

  // Links array
  const links = [
    {
      href: "/exams",
      label: "Exams",
      icon: <GraduationCap />,
    },
    {
      href: "/settings",
      label: "Account Settings",
      icon: <UserRound />,
    },
  ];

  // Open dropdown handler
  const dropdownHandler = () => {
    setShowDropdownBtns((prev) => !prev);
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <aside className="sticky hidden min-h-screen w-80 min-w-80 bg-blue-50 p-4 xl:block">
        <div className="relative">
          {showDropdownBtns && (
            <DropdownBtns dropdownHandler={dropdownHandler} />
          )}
        </div>

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
                  className={`mb-4 flex h-14 cursor-pointer items-center gap-2 pl-4 outline-blue-300 ${
                    pathName.includes(link.href)
                      ? "border border-blue-300 bg-blue-100 text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Avatar */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">
          <Image
            src={"assets/images/avatar.svg"}
            className="border-2 border-blue-600"
            alt="Logo"
            width={54}
            height={54}
          />
          <div className="flex flex-col">
            <span className="text-sm text-blue-600">{session?.username}</span>
            <span className="text-sm">{session?.email}</span>
          </div>

          <button onClick={dropdownHandler}>
            {/* */}
            <EllipsisVertical />
          </button>
        </div>
      </aside>

      {/* Mobile Navigation */}
      <aside className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-200 bg-white xl:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center ${
              pathName.includes(link.href) ? "text-blue-600" : "text-gray-500"
            }`}
          >
            <span>{link.icon}</span>
            <span className="text-xs">{link.label}</span>
          </Link>
        ))}
      </aside>
    </div>
  );
}
