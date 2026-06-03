import { act, renderHook } from "@testing-library/react";

import usePagination from "./usePagination";

describe("usePagination", () => {
  it("starts at page 1", () => {
    const { result } = renderHook(() => usePagination());

    expect(result.current.page).toBe(1);
    expect(result.current.pages).toEqual([1]);
  });

  it("goes to next page", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setTotalPages(5);
    });

    act(() => {
      result.current.handleNextPage();
    });

    expect(result.current.page).toBe(2);
  });

  it("does not go below page 1", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.handlePrevPage();
    });

    expect(result.current.page).toBe(1);
  });

  it("does not exceed total pages", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setTotalPages(3);
      result.current.setPage(3);
    });

    act(() => {
      result.current.handleNextPage();
    });

    expect(result.current.page).toBe(3);
  });

  it("navigates directly to a page", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setTotalPages(10);
      result.current.handleGoToPage(7);
    });

    expect(result.current.page).toBe(7);
  });

  it("builds full page list for totalPages <= 7", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setTotalPages(5);
    });

    expect(result.current.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it("includes ellipsis for large page counts", () => {
    const { result } = renderHook(() => usePagination());

    act(() => {
      result.current.setTotalPages(20);
      result.current.handleGoToPage(10);
    });

    const pages = result.current.pages;
    expect(pages[0]).toBe(1);
    expect(pages[pages.length - 1]).toBe(20);
    expect(pages).toContain("...");
  });
});
