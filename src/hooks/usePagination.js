import { useState, useCallback, useMemo } from "react";

function buildPageList(currentPage, totalPages) {
  if (totalPages <= 1) return [1];
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const range = [];
  for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
    range.push(i);
  }

  if (range[0] > 2) range.unshift('...');
  range.unshift(1);

  if (range[range.length - 1] < totalPages - 1) range.push('...');
  range.push(totalPages);

  return range;
}

export default function usePagination() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const pages = useMemo(() => buildPageList(page, totalPages), [page, totalPages]);

  const handlePrevPage = useCallback(() => {
    setPage((p) => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((p) => Math.min(totalPages, p + 1));
  }, [totalPages]);

  const handleGoToPage = useCallback((p) => {
    setPage(p);
  }, []);

  return {
    page,
    setPage,
    setTotalPages,
    pages,
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
  };
}
