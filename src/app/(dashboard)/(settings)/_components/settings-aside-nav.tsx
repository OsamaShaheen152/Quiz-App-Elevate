"use client";
import { Lock, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutBtn from "./log-out-btn";

export default function SettingsAsideNav() {
  const pathName = usePathname();

  // Links
  const links = [
    {
      href: "/profile",
      label: "Profile",
      icon: <UserRound />,
    },
    {
      href: "/change-password",
      label: "Change password",
      icon: <Lock />,
    },
  ];

  return (
    <aside className="relative h-screen w-80 bg-white px-2 pt-4">
      <nav className="flex w-full flex-col">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`mb-4 flex h-10 cursor-pointer items-center gap-2 pl-4 outline-blue-300 ${
                  pathName === link.href
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
      <div className="absolute bottom-16 left-0 right-0">
        <div className="flex justify-center">
          <LogOutBtn />
        </div>
      </div>
    </aside>
  );
}
