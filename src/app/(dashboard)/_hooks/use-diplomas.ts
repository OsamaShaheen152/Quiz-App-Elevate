import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchDiplomas(pageParam?: number) {
  const response = await fetch(`/api/diplomas?page=${pageParam}`, {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch diplomas");
  }
  const payload = await response.json();
  return payload;
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
