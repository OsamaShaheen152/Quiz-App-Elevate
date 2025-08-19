"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import useExams from "../_hooks/use-exams";
import { ChevronDown } from "lucide-react";

export default function Exams({ subjectId }: { subjectId: string }) {
  const { payload, isLoading, error, hasNextPage, fetchNextPage } =
    useExams(subjectId);

  console.log("subjectId From Exams component ", subjectId);

  // console.log(payload);

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
              <li key={exam._id} className="bg-blue-50">
                <span className="font-bold">{exam.title}</span>
                <span className="ml-2 text-gray-500">{exam.duration}</span>
                <span className="ml-2 text-gray-500">
                  {exam.numberOfQuestions}
                </span>
              </li>
            ))}
          </ul>
        )}

        {hasNextPage ? (
          <div className="flex flex-col items-center  text-gray-600 text-lg font-light">
            <p className="text-center my-2 ">Scroll to view more</p>
            <ChevronDown />
          </div>
        ) : (
          <p className="text-gray-600 text-center text-lg font-light my-3">
            End Of List
          </p>
        )}
      </div>
    </InfiniteScroll>
  );
}
