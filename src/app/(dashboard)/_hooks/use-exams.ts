"use client";
import { fetchExams } from "@/lib/apis/exams.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Exam } from "@/lib/types/quiz";
import { PaginatedResponse } from "@/lib/types/api";

export default function useExams(subjectId: string) {
  const {
    data: payload,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["exams", subjectId],
    queryFn: ({ pageParam }) => fetchExams(subjectId, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<Exam>) => {
      const { currentPage, numberOfPages } = lastPage.metadata;
      if (currentPage < numberOfPages) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  return {
    payload,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
  };
}
