"use client";
import Image from "next/image";
import useDiplomas from "../_hooks/use-diplomas";
import InfiniteScroll from "react-infinite-scroll-component";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Diplomas() {
  const router = useRouter();

  const { diplomas, isLoading, error, hasNextPage, fetchNextPage } =
    useDiplomas();

  type Diploma = {
    _id: string;
    name: string;
    icon: string;
    // add other properties if needed
  };

  const allSubjects: Diploma[] =
    diplomas?.pages.flatMap((page) => page.subjects as Diploma[]) || [];

  console.log(allSubjects);

  if (isLoading && !diplomas) {
    return <p>Loading...</p>;
  }

  return (
    <InfiniteScroll
      dataLength={allSubjects.length}
      hasMore={!!hasNextPage}
      next={fetchNextPage}
      loader={<p>Loading more...</p>}
    >
      <div>
        {/* Loading */}
        {isLoading && <p>Loading...</p>}

        {/* Error */}
        {error && <p className="text-red-500">Error: {error.message}</p>}

        {/* Diplomas */}
        {diplomas && (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {allSubjects.map((diploma) => (
              <li
                key={diploma._id}
                className="relative cursor-pointer"
                onClick={() => {
                  return router.push(`/exams/${diploma._id}`);
                }}
              >
                <Image
                  src={`${diploma.icon}`}
                  alt={diploma.name}
                  width={336}
                  height={448}
                  className="object-fit h-[448px] w-80"
                />
                <span className="absolute bottom-3 left-3 right-3 bg-[#155DFC80] py-5 pl-4 pr-16 text-xl font-semibold text-white">
                  {diploma.name}
                </span>
              </li>
            ))}
          </ul>
        )}

        {/* Navigation  */}
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
