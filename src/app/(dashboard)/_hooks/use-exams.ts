"use client";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchExams(subjectId: string, pageParam?: number) {
  const url = pageParam
    ? `/api/exams/${subjectId}?page=${pageParam}`
    : `/api/exams/${subjectId}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch exams");

  const payload = await response.json();
  return payload;
}

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
