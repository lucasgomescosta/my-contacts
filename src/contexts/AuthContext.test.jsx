import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { AuthProvider } from "./AuthContext";
import { useAuth } from "../hooks/useAuth";
import { storageKeys } from "../config/storageKeys";
import { AuthService } from "../services/AuthService";

vi.mock("../services/AuthService", () => ({
  AuthService: {
    signIn: vi.fn(),
    signUp: vi.fn(),
    refreshToken: vi.fn(),
  },
}));

function AuthConsumer() {
  const { signedIn, user, signIn, signUp, signOut } = useAuth();

  return (
    <div>
      <span>{signedIn ? "signed-in" : "signed-out"}</span>
      <span>{user?.email ?? "no-user"}</span>

      <button type="button" onClick={() => signIn("john@doe.com", "123456")}>
        sign-in
      </button>

      <button
        type="button"
        onClick={() => signUp({ name: "John", email: "john@doe.com", password: "123456" })}
      >
        sign-up
      </button>

      <button type="button" onClick={() => signOut()}>
        sign-out
      </button>
    </div>
  );
}

function renderAuth() {
  return render(
    <AuthProvider>
      <AuthConsumer />
    </AuthProvider>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("starts signed out when there is no token", () => {
    renderAuth();

    expect(screen.getByText("signed-out")).toBeInTheDocument();
    expect(screen.getByText("no-user")).toBeInTheDocument();
  });

  it("hydrates signed in state from localStorage", () => {
    localStorage.setItem(storageKeys.accessToken, "token-123");
    localStorage.setItem(
      storageKeys.user,
      JSON.stringify({ name: "John", email: "john@doe.com", role: "Usuário" })
    );

    renderAuth();

    expect(screen.getByText("signed-in")).toBeInTheDocument();
    expect(screen.getByText("john@doe.com")).toBeInTheDocument();
  });

  it("signIn stores auth data and updates state", async () => {
    AuthService.signIn.mockResolvedValue({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      user: { name: "John", email: "john@doe.com", role: "Usuário" },
    });

    renderAuth();

    fireEvent.click(screen.getByRole("button", { name: "sign-in" }));

    await waitFor(() => {
      expect(screen.getByText("signed-in")).toBeInTheDocument();
      expect(screen.getByText("john@doe.com")).toBeInTheDocument();
    });

    expect(AuthService.signIn).toHaveBeenCalledWith({
      email: "john@doe.com",
      password: "123456",
    });

    expect(localStorage.getItem(storageKeys.accessToken)).toBe("access-token");
    expect(localStorage.getItem(storageKeys.refreshToken)).toBe("refresh-token");
    expect(JSON.parse(localStorage.getItem(storageKeys.user))).toEqual({
      name: "John",
      email: "john@doe.com",
      role: "Usuário",
    });
  });

  it("signUp calls signUp and then signIn", async () => {
    AuthService.signUp.mockResolvedValue({});
    AuthService.signIn.mockResolvedValue({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      user: { name: "John", email: "john@doe.com", role: "Usuário" },
    });

    renderAuth();

    fireEvent.click(screen.getByRole("button", { name: "sign-up" }));

    await waitFor(() => {
      expect(screen.getByText("signed-in")).toBeInTheDocument();
    });

    expect(AuthService.signUp).toHaveBeenCalledWith({
      name: "John",
      email: "john@doe.com",
      password: "123456",
    });

    expect(AuthService.signIn).toHaveBeenCalledWith({
      email: "john@doe.com",
      password: "123456",
    });
  });

  it("signOut clears auth state and storage", async () => {
    AuthService.signIn.mockResolvedValue({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      user: { name: "John", email: "john@doe.com", role: "Usuário" },
    });

    renderAuth();

    fireEvent.click(screen.getByRole("button", { name: "sign-in" }));

    await waitFor(() => {
      expect(screen.getByText("signed-in")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: "sign-out" }));

    await waitFor(() => {
      expect(screen.getByText("signed-out")).toBeInTheDocument();
      expect(screen.getByText("no-user")).toBeInTheDocument();
    });

    expect(localStorage.getItem(storageKeys.accessToken)).toBeNull();
    expect(localStorage.getItem(storageKeys.refreshToken)).toBeNull();
    expect(localStorage.getItem(storageKeys.user)).toBeNull();
  });
});
