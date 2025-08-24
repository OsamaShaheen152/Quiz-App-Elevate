import { fetchDiplomas } from "@/lib/apis/diplomas.api";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useDiplomas() {
  const {
    data: diplomas,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["diplomas"],
    queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
      fetchDiplomas(pageParam),
    getNextPageParam: (lastPage) => {
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
