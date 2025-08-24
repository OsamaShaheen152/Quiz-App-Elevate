"use client";
import { fetchExams } from "@/lib/apis/exams.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useExams(subjectId: string) {
  const {
    data: payload,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["exams", subjectId],
    queryFn: ({ pageParam = 1 }) => fetchExams(subjectId, pageParam),
    getNextPageParam: (lastPage) => {
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
