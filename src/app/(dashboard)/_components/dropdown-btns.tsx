import { UserRound } from "lucide-react";
import LogOutBtn from "../settings/(settings)/_components/log-out-btn";
import Link from "next/link";

export default function DropdownBtns({
  dropdownHandler,
}: {
  dropdownHandler: () => void;
}) {
  return (
    <ul className="absolute top-0 w-64 divide-y-2 bg-white">
      <li className="p-2" onClick={dropdownHandler}>
        <Link
          href="/settings"
          className={`flex cursor-pointer items-center gap-2 outline-blue-300`}
        >
          <span>
            <UserRound />
          </span>
          <span>Account</span>
        </Link>
      </li>

      <li onClick={dropdownHandler}>
        <LogOutBtn className="bg-white hover:bg-white" />
      </li>
    </ul>
  );
}
