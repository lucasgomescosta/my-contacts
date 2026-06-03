import { renderHook } from "@testing-library/react";

import useCategoryNew from "./useCategoryNew";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCategoryByName } from "../../services/CategoriesService";
import toast from "../../utils/toast";

let mutationOptions;
const mutateMock = vi.fn();
const invalidateQueries = vi.fn();

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn((options) => {
    mutationOptions = options;
    return { mutate: mutateMock, isPending: false };
  }),
  useQueryClient: vi.fn(() => ({
    invalidateQueries,
  })),
}));

vi.mock("../../services/CategoriesService", () => ({
  createCategory: vi.fn(),
  getCategoryByName: vi.fn(),
}));

vi.mock("../../utils/toast", () => ({
  default: vi.fn(),
}));

describe("useCategoryNew", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => { });
    mutationOptions = undefined;
    mutateMock.mockReset();
    invalidateQueries.mockReset();
    vi.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("submits category when name is unique", async () => {
    getCategoryByName.mockResolvedValue([]);

    const { result } = renderHook(() => useCategoryNew());

    await result.current.handleSubmit({ name: "Família" });

    expect(getCategoryByName).toHaveBeenCalledWith("Família");
    expect(mutateMock).toHaveBeenCalledWith({ name: "Família" });
  });

  it("blocks submit and shows toast when category already exists", async () => {
    getCategoryByName.mockResolvedValue([{ id: "1", name: "Família" }]);

    const { result } = renderHook(() => useCategoryNew());

    await result.current.handleSubmit({ name: "Família" });

    expect(mutateMock).not.toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Já existe uma categoria com esse nome",
    });
  });

  it("resets form, invalidates categories and shows success toast on create success", () => {
    const resetFields = vi.fn();
    const { result } = renderHook(() => useCategoryNew());

    result.current.categoryFormRef.current = { resetFields };
    mutationOptions.onSuccess();

    expect(resetFields).toHaveBeenCalledTimes(1);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["categories"] });
    expect(toast).toHaveBeenCalledWith({
      type: "success",
      text: "Categoria cadastrada com sucesso",
    });
  });

  it("shows generic error toast when lookup fails", async () => {
    getCategoryByName.mockRejectedValue(new Error("lookup fail"));

    const { result } = renderHook(() => useCategoryNew());

    await result.current.handleSubmit({ name: "Nova" });

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Erro ao cadastrar categoria",
    });
  });
});
