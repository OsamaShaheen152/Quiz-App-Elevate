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

  const pathName = usePathname();
  const { data: session } = useSession();

  // Links array
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

  // Open dropdown handler
  const dropdownHandler = () => {
    setShowDropdownBtns((prev) => !prev);
  };

  return (
    <aside className="fixed h-screen w-80 bg-blue-50 p-4">
      <div className="relative">
        {showDropdownBtns && <DropdownBtns dropdownHandler={dropdownHandler} />}
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
  );
}
