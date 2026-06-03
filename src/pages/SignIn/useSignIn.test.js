import { renderHook } from "@testing-library/react";

import useSignIn from "./useSignIn";
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

describe("useSignIn", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("signs in and navigates to home on success", async () => {
    const navigate = vi.fn();
    const signIn = vi.fn().mockResolvedValue(undefined);

    useNavigate.mockReturnValue(navigate);
    useAuth.mockReturnValue({ signIn });

    const { result } = renderHook(() => useSignIn());

    await result.current.handleSubmit({ email: "john@doe.com", password: "123456" });

    expect(signIn).toHaveBeenCalledWith("john@doe.com", "123456");
    expect(navigate).toHaveBeenCalledWith("/");
    expect(toast).not.toHaveBeenCalled();
  });

  it("shows error toast when sign in fails", async () => {
    const navigate = vi.fn();
    const signIn = vi.fn().mockRejectedValue(new Error("invalid"));

    useNavigate.mockReturnValue(navigate);
    useAuth.mockReturnValue({ signIn });

    const { result } = renderHook(() => useSignIn());

    await result.current.handleSubmit({ email: "john@doe.com", password: "wrong" });

    expect(navigate).not.toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith({
      type: "danger",
      text: "Credenciais inválidas.",
    });
  });
});
