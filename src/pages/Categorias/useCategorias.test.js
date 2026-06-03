import { act, renderHook, waitFor } from "@testing-library/react";

import useCategorias from "./useCategorias";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import toast from "../../utils/toast";

let queryResult;
let mutationOptions;

const mutateMock = vi.fn();
const prefetchQuery = vi.fn();
const invalidateQueries = vi.fn();
const navigate = vi.fn();

const setPage = vi.fn();
const setTotalPages = vi.fn();
const handlePrevPage = vi.fn();
const handleNextPage = vi.fn();
const handleGoToPage = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(() => queryResult),
  useMutation: vi.fn((options) => {
    mutationOptions = options;
    return { mutate: mutateMock, isPending: false };
  }),
  useQueryClient: vi.fn(() => ({
    prefetchQuery,
    invalidateQueries,
  })),
}));

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../hooks/usePagination", () => ({
  default: vi.fn(),
}));

vi.mock("../../services/CategoriesService", () => ({
  listCategories: vi.fn(),
  deleteCategory: vi.fn(),
}));

vi.mock("../../utils/toast", () => ({
  default: vi.fn(),
}));

function makePagination(overrides = {}) {
  return {
    page: 1,
    setPage,
    setTotalPages,
    pages: [1, 2],
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
    ...overrides,
  };
}

describe("useCategorias", () => {
  beforeEach(() => {
    mutationOptions = undefined;
    queryResult = {
      data: {
        categories: [
          { id: "1", name: "Família" },
          { id: "2", name: "Amigos" },
        ],
        pagination: {
          total: 2,
          totalPages: 2,
        },
      },
      isLoading: false,
    };

    setPage.mockReset();
    setTotalPages.mockReset();
    handlePrevPage.mockReset();
    handleNextPage.mockReset();
    handleGoToPage.mockReset();
    mutateMock.mockReset();
    prefetchQuery.mockReset();
    invalidateQueries.mockReset();
    navigate.mockReset();
    vi.clearAllMocks();

    useNavigate.mockReturnValue(navigate);
    usePagination.mockReturnValue(makePagination());
  });

  it("returns list data, sets total pages and prefetches next page", async () => {
    const { result } = renderHook(() => useCategorias());

    await waitFor(() => {
      expect(setTotalPages).toHaveBeenCalledWith(2);
    });

    expect(result.current.categories).toEqual([
      { id: "1", name: "Família" },
      { id: "2", name: "Amigos" },
    ]);
    expect(result.current.total).toBe(2);
    expect(result.current.navigate).toBe(navigate);
    expect(prefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ["categories", 2] })
    );
  });

  it("opens delete modal and confirms deletion", () => {
    const { result } = renderHook(() => useCategorias());

    act(() => {
      result.current.handleDeleteCategory({ id: "2", name: "Amigos" });
    });

    expect(result.current.isDeleteModalVisible).toBe(true);
    expect(result.current.categoryBeingDeleted).toEqual({ id: "2", name: "Amigos" });

    act(() => {
      result.current.handleConfirmDeleteCategory();
    });

    expect(mutateMock).toHaveBeenCalledWith("2");
  });

  it("handles delete success and error callbacks", () => {
    usePagination.mockReturnValue(makePagination({ page: 2 }));
    queryResult = {
      ...queryResult,
      data: {
        categories: [{ id: "1", name: "Família" }],
        pagination: { total: 1, totalPages: 2 },
      },
    };

    const { result } = renderHook(() => useCategorias());

    act(() => {
      result.current.handleDeleteCategory({ id: "1", name: "Família" });
    });

    act(() => {
      mutationOptions.onSuccess();
    });

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["categories"] });
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
    expect(toast).toHaveBeenCalledWith({
      type: "success",
      text: "Categoria deletada com sucesso!",
    });

    act(() => {
      mutationOptions.onError();
    });

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Erro ao deletar categoria!",
    });
  });
});
