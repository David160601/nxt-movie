"use client";
import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/navigation";
function Pagination({
  pageCount,
  forcePage,
  search,
}: {
  pageCount: number;
  forcePage: number;
  search: string;
}) {
  const router = useRouter();
  return (
    <ReactPaginate
      forcePage={forcePage - 1}
      nextLabel=">"
      onPageChange={(e) => {
        router.push(`/movie?search=${search}&page=${e.selected + 1}`);
      }}
      marginPagesDisplayed={2}
      pageCount={pageCount}
      previousLabel="<"
      pageLinkClassName="py-2 px-2 hover:bg-red-600 duration-500"
      activeLinkClassName="bg-red-600 py-2 px-2"
      className="flex gap-3 items-center text-sm"
      renderOnZeroPageCount={null}
    />
  );
}

export default Pagination;
