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

  const allSubjects = diplomas?.pages.flatMap((page) => page.subjects) || [];

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
        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error.message}</p>}
        {diplomas && (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {allSubjects.map((diploma) => (
              <li
                key={diploma._id}
                className="cursor-pointer relative"
                onClick={() => {
                  console.log(diploma._id);
                  return router.push(`/exams/${diploma._id}`);
                }}
              >
                <Image
                  src={`${diploma.icon}`}
                  alt={diploma.name}
                  width={336}
                  height={448}
                  className="w-80 h-[448px] object-fit "
                />
                <span className="absolute bottom-3 left-3 right-3 text-white bg-[#155DFC80] py-5 pl-4 pr-16 text-xl font-semibold ">
                  {diploma.name}
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
