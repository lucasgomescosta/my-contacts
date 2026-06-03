import { act, renderHook, waitFor } from "@testing-library/react";

import useCategoryEdit from "./useCategoryEdit";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategoryByName, updateCategory } from "../../services/CategoriesService";
import toast from "../../utils/toast";

let queryResult;
const navigate = vi.fn();
const invalidateQueries = vi.fn();

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(() => queryResult),
  useQueryClient: vi.fn(() => ({
    invalidateQueries,
  })),
}));

vi.mock("../../services/CategoriesService", () => ({
  getCategoryById: vi.fn(),
  updateCategory: vi.fn(),
  getCategoryByName: vi.fn(),
}));

vi.mock("../../utils/toast", () => ({
  default: vi.fn(),
}));

describe("useCategoryEdit", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => { });
    queryResult = {
      isLoading: false,
      data: { id: "7", name: "Amigos" },
      isError: false,
    };

    navigate.mockReset();
    invalidateQueries.mockReset();
    getCategoryByName.mockReset();
    updateCategory.mockReset();
    vi.clearAllMocks();

    useParams.mockReturnValue({ id: "7" });
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("returns loading and category name", () => {
    const { result } = renderHook(() => useCategoryEdit());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.categoryName).toBe("Amigos");
  });

  it("redirects and shows toast when category is not found", async () => {
    queryResult = {
      isLoading: false,
      data: null,
      isError: true,
    };

    renderHook(() => useCategoryEdit());

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/", { replace: true });
    });

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Categoria não encontrada",
    });
  });

  it("fills form field when category data arrives", () => {
    const setFieldsValue = vi.fn();
    queryResult = {
      isLoading: true,
      data: null,
      isError: false,
    };

    const { result, rerender } = renderHook(() => useCategoryEdit());

    result.current.categoryFormRef.current = { setFieldsValue };

    queryResult = {
      isLoading: false,
      data: { id: "7", name: "Amigos" },
      isError: false,
    };

    rerender();

    expect(setFieldsValue).toHaveBeenCalledWith({ name: "Amigos" });
  });

  it("sets field error and blocks update when duplicate category exists", async () => {
    const setFieldError = vi.fn();
    const clearFieldError = vi.fn();

    getCategoryByName.mockResolvedValue([
      { id: "7", name: "Amigos" },
      { id: "9", name: "Família" },
    ]);

    const { result } = renderHook(() => useCategoryEdit());
    result.current.categoryFormRef.current = { setFieldError, clearFieldError };

    await act(async () => {
      await result.current.handleSubmit({ name: "Família" });
    });

    expect(setFieldError).toHaveBeenCalledWith("name", "Já existe uma categoria com esse nome");
    expect(clearFieldError).not.toHaveBeenCalled();
    expect(updateCategory).not.toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Já existe uma categoria com esse nome",
    });
  });

  it("updates category, clears field error and invalidates cache", async () => {
    const setFieldError = vi.fn();
    const clearFieldError = vi.fn();

    getCategoryByName.mockResolvedValue([{ id: "7", name: "Amigos" }]);
    updateCategory.mockResolvedValue({});

    const { result } = renderHook(() => useCategoryEdit());
    result.current.categoryFormRef.current = { setFieldError, clearFieldError };

    await act(async () => {
      await result.current.handleSubmit({ name: "Trabalho" });
    });

    expect(clearFieldError).toHaveBeenCalledWith("name");
    expect(updateCategory).toHaveBeenCalledWith("7", { name: "Trabalho" });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["categories"] });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["category", "7"] });
    expect(toast).toHaveBeenCalledWith({
      type: "success",
      text: "Categoria atualizada com sucesso",
    });
  });

  it("shows error toast when update fails", async () => {
    const clearFieldError = vi.fn();

    getCategoryByName.mockResolvedValue([{ id: "7", name: "Amigos" }]);
    updateCategory.mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useCategoryEdit());
    result.current.categoryFormRef.current = { setFieldError: vi.fn(), clearFieldError };

    await act(async () => {
      await result.current.handleSubmit({ name: "Trabalho" });
    });

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Erro ao atualizar categoria",
    });
  });
});
