import { useState } from "react";

export const usePagination = <T>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, maxPage));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const jumpToPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, maxPage));
    setCurrentPage(pageNumber);
  };

  return { currentData, currentPage, maxPage, nextPage, prevPage, jumpToPage };
};
