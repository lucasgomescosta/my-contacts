import { act, renderHook, waitFor } from "@testing-library/react";

import useHome from "./useHome";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import usePagination from "../../hooks/usePagination";
import toast from "../../utils/toast";

let queryResult;
let mutationOptions;

const mutateMock = vi.fn();
const prefetchQuery = vi.fn();
const invalidateQueries = vi.fn();

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

vi.mock("../../hooks/usePagination", () => ({
  default: vi.fn(),
}));

vi.mock("../../services/ContactsService", () => ({
  listContacts: vi.fn(),
  deleteContact: vi.fn(),
}));

vi.mock("../../utils/toast", () => ({
  default: vi.fn(),
}));

function makePagination(overrides = {}) {
  return {
    page: 1,
    setPage,
    setTotalPages,
    pages: [1, 2, 3],
    handlePrevPage,
    handleNextPage,
    handleGoToPage,
    ...overrides,
  };
}

describe("useHome", () => {
  beforeEach(() => {
    mutationOptions = undefined;
    queryResult = {
      data: {
        contacts: [
          { id: "1", name: "Maria" },
          { id: "2", name: "Ana" },
        ],
        pagination: {
          total: 2,
          totalPages: 3,
        },
      },
      isLoading: false,
      isError: false,
      refetch: vi.fn(),
    };

    setPage.mockReset();
    setTotalPages.mockReset();
    handlePrevPage.mockReset();
    handleNextPage.mockReset();
    handleGoToPage.mockReset();
    mutateMock.mockReset();
    prefetchQuery.mockReset();
    invalidateQueries.mockReset();
    vi.clearAllMocks();

    usePagination.mockReturnValue(makePagination());
  });

  it("returns query data, sets total pages and prefetches next page", async () => {
    const { result } = renderHook(() => useHome());

    await waitFor(() => {
      expect(setTotalPages).toHaveBeenCalledWith(3);
    });

    expect(result.current.contacts).toEqual([
      { id: "1", name: "Maria" },
      { id: "2", name: "Ana" },
    ]);
    expect(result.current.total).toBe(2);
    expect(result.current.totalPages).toBe(3);
    expect(prefetchQuery).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: ["contacts", "asc", 2] })
    );
  });

  it("filters contacts by search term and toggles order", async () => {
    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.handleChangeSearchTerm({ target: { value: "ana" } });
    });

    await waitFor(() => {
      expect(result.current.searchTerm).toBe("ana");
      expect(result.current.filteredContacts).toEqual([{ id: "2", name: "Ana" }]);
    });

    act(() => {
      result.current.handleToggleOrderBy();
    });

    expect(setPage).toHaveBeenCalledWith(1);
    expect(result.current.orderBy).toBe("desc");
  });

  it("opens delete modal and confirms deletion", () => {
    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.handleDeleteContact({ id: "2", name: "Ana" });
    });

    expect(result.current.isDeleteModalVisible).toBe(true);
    expect(result.current.contactBeingDeleted).toEqual({ id: "2", name: "Ana" });

    act(() => {
      result.current.handleConfirmDeleteContact();
    });

    expect(mutateMock).toHaveBeenCalledWith("2");
  });

  it("handles delete success and error callbacks", () => {
    usePagination.mockReturnValue(makePagination({ page: 2 }));
    queryResult = {
      ...queryResult,
      data: {
        contacts: [{ id: "1", name: "Maria" }],
        pagination: { total: 1, totalPages: 2 },
      },
    };

    const { result } = renderHook(() => useHome());

    act(() => {
      result.current.handleDeleteContact({ id: "1", name: "Maria" });
    });

    act(() => {
      mutationOptions.onSuccess();
    });

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["contacts"] });
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));
    expect(toast).toHaveBeenCalledWith({
      type: "success",
      text: "Contato deletado com sucesso!",
    });

    act(() => {
      mutationOptions.onError();
    });

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Erro ao deletar contato!",
    });
  });
});
