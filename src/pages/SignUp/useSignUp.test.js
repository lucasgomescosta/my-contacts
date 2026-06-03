import { renderHook } from "@testing-library/react";

import useSignUp from "./useSignUp";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "../../utils/toast";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

vi.mock("../../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../utils/toast", () => ({
  default: vi.fn(),
}));

describe("useSignUp", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("signs up, shows success toast and navigates to home", async () => {
    const navigate = vi.fn();
    const signUp = vi.fn().mockResolvedValue(undefined);
    const formValues = { name: "John", email: "john@doe.com", password: "123456" };

    useNavigate.mockReturnValue(navigate);
    useAuth.mockReturnValue({ signUp });

    const { result } = renderHook(() => useSignUp());

    await result.current.handleSubmit(formValues);

    expect(signUp).toHaveBeenCalledWith(formValues);
    expect(toast).toHaveBeenCalledWith({
      type: "success",
      text: "Conta criada com sucesso!",
    });
    expect(navigate).toHaveBeenCalledWith("/");
  });

  it("shows error toast when sign up fails", async () => {
    const navigate = vi.fn();
    const signUp = vi.fn().mockRejectedValue(new Error("fail"));

    useNavigate.mockReturnValue(navigate);
    useAuth.mockReturnValue({ signUp });

    const { result } = renderHook(() => useSignUp());

    await result.current.handleSubmit({ name: "John", email: "john@doe.com", password: "123456" });

    expect(navigate).not.toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Não foi possível criar sua conta.",
    });
  });
});
