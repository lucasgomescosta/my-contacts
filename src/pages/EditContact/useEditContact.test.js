import { act, renderHook, waitFor } from "@testing-library/react";

import useEditContact from "./useEditContact";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updateContact } from "../../services/ContactsService";
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

vi.mock("../../services/ContactsService", () => ({
  getContactById: vi.fn(),
  updateContact: vi.fn(),
}));

vi.mock("../../utils/toast", () => ({
  default: vi.fn(),
}));

describe("useEditContact", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => { });
    queryResult = {
      isLoading: false,
      data: { id: "10", name: "Maria", email: "maria@mail.com" },
      isError: false,
    };

    navigate.mockReset();
    invalidateQueries.mockReset();
    updateContact.mockReset();
    vi.clearAllMocks();

    useParams.mockReturnValue({ id: "10" });
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("returns loading and contact name from query data", () => {
    const { result } = renderHook(() => useEditContact());

    expect(useQuery).toHaveBeenCalledTimes(1);
    expect(useQueryClient).toHaveBeenCalledTimes(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.contactName).toBe("Maria");
  });

  it("redirects and shows toast when contact is not found", async () => {
    queryResult = {
      isLoading: false,
      data: null,
      isError: true,
    };

    renderHook(() => useEditContact());

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/", { replace: true });
    });

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Contato não encontrado",
    });
  });

  it("fills form fields when data arrives and ref is available", () => {
    const setFieldsValue = vi.fn();
    queryResult = {
      isLoading: true,
      data: null,
      isError: false,
    };

    const { result, rerender } = renderHook(() => useEditContact());

    result.current.contactFormRef.current = { setFieldsValue };

    queryResult = {
      isLoading: false,
      data: { id: "10", name: "Maria", email: "maria@mail.com" },
      isError: false,
    };

    rerender();

    expect(setFieldsValue).toHaveBeenCalledWith({
      id: "10",
      name: "Maria",
      email: "maria@mail.com",
    });
  });

  it("updates contact removing unchanged email and invalidates cache", async () => {
    updateContact.mockResolvedValue({});
    const { result } = renderHook(() => useEditContact());

    await act(async () => {
      await result.current.handleSubmit({
        name: "Maria Silva",
        email: "maria@mail.com",
        phone: "11999999999",
      });
    });

    expect(updateContact).toHaveBeenCalledWith("10", {
      name: "Maria Silva",
      phone: "11999999999",
    });

    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["contacts"] });
    expect(invalidateQueries).toHaveBeenCalledWith({ queryKey: ["contact", "10"] });
    expect(toast).toHaveBeenCalledWith({
      type: "success",
      text: "Contato atualizado com sucesso",
    });
  });

  it("shows error toast when update fails", async () => {
    updateContact.mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useEditContact());

    await act(async () => {
      await result.current.handleSubmit({ name: "Maria" });
    });

    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Erro ao atualizar contato",
    });
  });
});
