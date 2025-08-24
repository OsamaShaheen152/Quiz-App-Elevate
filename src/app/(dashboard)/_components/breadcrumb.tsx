"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathArray = pathname.split("/").filter((x) => x);

  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex items-center gap-1">
        <li>
          <Link href="/diplomas" className="hover:underline">
            Home
          </Link>
        </li>

        {pathArray.map((segment, index) => {
          const href = "/" + pathArray.slice(0, index + 1).join("/");
          const isLast = index === pathArray.length - 1;

          return (
            <li
              key={href}
              className="flex items-center gap-1 font-normal text-sm"
            >
              <span>/</span>
              {isLast ? (
                <span className="text-blue-600 ">
                  {decodeURIComponent(segment.replace("-", " "))}
                </span>
              ) : (
                <Link href={href} className="hover:underline">
                  {decodeURIComponent(segment.replace("-", " "))}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
