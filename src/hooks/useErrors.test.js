import { act, renderHook } from "@testing-library/react";

import useErrors from "./useErrors";

describe("useErrors", () => {
  it("starts with no errors", () => {
    const { result } = renderHook(() => useErrors());

    expect(result.current.errors).toEqual([]);
  });

  it("adds an error for a field", () => {
    const { result } = renderHook(() => useErrors());

    act(() => {
      result.current.setError({ field: "email", message: "Email inválido" });
    });

    expect(result.current.errors).toEqual([
      { field: "email", message: "Email inválido" },
    ]);
  });

  it("does not add duplicate errors for the same field", () => {
    const { result } = renderHook(() => useErrors());

    act(() => {
      result.current.setError({ field: "email", message: "Email inválido" });
      result.current.setError({ field: "email", message: "Outro erro" });
    });

    expect(result.current.errors).toHaveLength(1);
  });

  it("removes an error by field name", () => {
    const { result } = renderHook(() => useErrors());

    act(() => {
      result.current.setError({ field: "email", message: "Email inválido" });
      result.current.removeError("email");
    });

    expect(result.current.errors).toEqual([]);
  });

  it("returns the error message for a given field", () => {
    const { result } = renderHook(() => useErrors());

    act(() => {
      result.current.setError({ field: "name", message: "Nome obrigatório" });
    });

    expect(result.current.getErrorMessageFieldName("name")).toBe(
      "Nome obrigatório"
    );
  });

  it("returns undefined for a field with no error", () => {
    const { result } = renderHook(() => useErrors());

    expect(result.current.getErrorMessageFieldName("name")).toBeUndefined();
  });
});
