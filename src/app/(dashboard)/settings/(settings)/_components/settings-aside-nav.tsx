"use client";
import { Lock, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogOutBtn from "./log-out-btn";

export default function SettingsAsideNav() {
  // Hooks
  const pathName = usePathname();

  // Links
  const links = [
    {
      href: "/settings/profile",
      label: "Profile",
      icon: <UserRound />,
    },
    {
      href: "/settings/change-password",
      label: "Change password",
      icon: <Lock />,
    },
  ];

  return (
    <div>
      {/* Desktop navigation */}
      <aside className="relative hidden min-h-[calc(100vh-200px)] w-80 bg-white px-2 pt-4 xl:block">
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
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center">
            <LogOutBtn />
          </div>
        </div>
      </aside>

      {/* Mobile navigation */}
      <aside className="fixed bottom-14 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-y border-gray-200 bg-white text-sm xl:hidden">
        <nav className="flex w-full items-center justify-evenly">
          <ul className="flex gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex h-10 min-w-[120px] items-center justify-center gap-2 px-4 outline-blue-300 ${
                    pathName === link.href ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
