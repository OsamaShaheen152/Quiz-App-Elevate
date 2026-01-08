"use client";

import { usePathname } from "next/navigation";
import { useQuiz } from "../_hooks/use-quiz";

export default function TopBar() {
  // Get Pathname
  const pathnameUrl = usePathname();

  // Remove leading slash
  let pathname = pathnameUrl.slice(1);

  const { data, isLoading: isLoadingQuiz } = useQuiz(pathname.split("/")[1]);

  if (pathname.includes("quiz")) {
    const quizName = data?.questions[0].exam.title;
    pathname = `quiz / ${isLoadingQuiz ? "Loading..." : quizName}`;
  }
  return (
    <div className="my-2 w-full bg-blue-600 p-4 text-xl font-semibold capitalize text-white xl:text-3xl">
      {pathname}
    </div>
  );
}
