import { fetchDiplomas } from "@/lib/apis/diplomas.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/lib/types/api";

// Assuming diplomas are subjects - you may need to create a proper type for this
interface Subject {
  _id: string;
  name: string;
  // Add other subject properties as needed
}

export default function useDiplomas() {
  const {
    data: diplomas,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["diplomas"],
    queryFn: ({ pageParam }) => fetchDiplomas(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedResponse<Subject>) => {
      const { currentPage, numberOfPages } = lastPage.metadata;
      if (currentPage < numberOfPages) {
        return currentPage + 1;
      }
      return undefined;
    },
  });

  return {
    diplomas,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
  };
}
