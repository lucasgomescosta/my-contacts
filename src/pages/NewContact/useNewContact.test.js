import { renderHook } from "@testing-library/react";

import useNewContact from "./useNewContact";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

vi.mock("../../services/ContactsService", () => ({
  createContact: vi.fn(),
}));

vi.mock("../../utils/toast", () => ({
  default: vi.fn(),
}));

describe("useNewContact", () => {
  beforeEach(() => {
    mutationOptions = undefined;
    mutateMock.mockReset();
    invalidateQueries.mockReset();
    vi.clearAllMocks();
  });

  it("calls mutation mutate on submit", async () => {
    const { result } = renderHook(() => useNewContact());

    await result.current.handleSubmit({ name: "Maria" });

    expect(useMutation).toHaveBeenCalledTimes(1);
    expect(useQueryClient).toHaveBeenCalledTimes(1);
    expect(mutateMock).toHaveBeenCalledWith({ name: "Maria" });
  });

  it("resets form, invalidates contacts and shows success toast on success", () => {
    const resetFields = vi.fn();
    const { result } = renderHook(() => useNewContact());

    result.current.contactFormRef.current = { resetFields };
    mutationOptions.onSuccess();

    expect(resetFields).toHaveBeenCalledTimes(1);
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["contacts"] });
    expect(toast).toHaveBeenCalledWith({
      type: "success",
      text: "Contato cadastrado com sucesso!",
      duration: 3000,
    });
  });

  it("shows error toast on mutation error", () => {
    renderHook(() => useNewContact());

    mutationOptions.onError(new Error("fail"));

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Erro ao cadastrar contato",
    });
  });
});
