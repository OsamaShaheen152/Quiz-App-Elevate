"use client";

import { usePathname } from "next/navigation";
import useExams from "../_hooks/use-exams";
import { useQuiz } from "../_hooks/use-quiz";

export default function TopBar() {
  const pathnameUrl = usePathname();
  let pathname = pathnameUrl.slice(1);

  const { payload, isLoading: isLoadingExams } = useExams(
    pathname.split("/")[1],
  );
  const { data, isLoading: isLoadingQuiz } = useQuiz(pathname.split("/")[1]);

  if (pathname.includes("exams")) {
    const examName = payload?.pages[0]?.exams[0]?.title;

    pathname = `exams / ${isLoadingExams ? "Loading..." : examName}`;
  } else if (pathname.includes("quiz")) {
    const quizName = data?.questions[0].exam.title;

    pathname = `quiz / ${isLoadingQuiz ? "Loading..." : quizName}`;
  }
  return (
    <div className="my-2 w-full bg-blue-600 p-4 text-3xl font-semibold capitalize text-white">
      {pathname}
    </div>
  );
}
