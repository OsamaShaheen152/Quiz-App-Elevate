"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import useExams from "../_hooks/use-exams";
import { ChevronDown, Timer } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Exams({ subjectId }: { subjectId: string }) {
  const router = useRouter();

  const { payload, isLoading, error, hasNextPage, fetchNextPage } =
    useExams(subjectId);

  console.log("subjectId From Exams component ", subjectId);

  const allSubjectExams = payload?.pages?.flatMap((page) => page?.exams) || [];
  console.log(allSubjectExams);

  return (
    <InfiniteScroll
      dataLength={allSubjectExams.length}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      loader={<p className="text-center">Loading more...</p>}
    >
      <div>
        {isLoading && <p>Loading...</p>}

        {error && <p className="text-red-500">Error: {error.message}</p>}

        {allSubjectExams && (
          <ul>
            {allSubjectExams.map((exam) => (
              <li
                key={exam._id}
                className="flex cursor-pointer items-center justify-between bg-blue-50 px-6 py-3"
                onClick={() => {
                  console.log(exam._id);
                  router.push(`/quiz/${exam._id}`);
                }}
              >
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-semibold text-blue-600">
                    {exam.title}
                  </span>
                  <span className="text-gray-500">
                    {exam.numberOfQuestions} {"  "}Questions
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Timer />
                  <span>Duration:</span>
                  <span className="text-gray-500">{exam.duration} miutes</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {hasNextPage ? (
          <div className="flex flex-col items-center text-lg font-light text-gray-600">
            <p className="my-2 text-center">Scroll to view more</p>
            <ChevronDown />
          </div>
        ) : (
          <p className="my-3 text-center text-lg font-light text-gray-600">
            End Of List
          </p>
        )}
      </div>
    </InfiniteScroll>
  );
}
