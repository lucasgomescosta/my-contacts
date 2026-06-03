import { vi } from "vitest";

import apiClient from "../utils/api";
import { AuthService } from "./AuthService";

vi.mock("../utils/api", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("signs up a user", async () => {
    apiClient.post.mockResolvedValue({ data: { token: "abc" } });

    await expect(
      AuthService.signUp({ name: "Alice", email: "alice@example.com", password: "123456" })
    ).resolves.toEqual({ token: "abc" });

    expect(apiClient.post).toHaveBeenCalledWith("/auth/signup", {
      name: "Alice",
      email: "alice@example.com",
      password: "123456",
    });
  });

  it("signs in a user", async () => {
    apiClient.post.mockResolvedValue({ data: { token: "xyz" } });

    await expect(
      AuthService.signIn({ email: "alice@example.com", password: "123456" })
    ).resolves.toEqual({ token: "xyz" });
  });

  it("refreshes tokens", async () => {
    apiClient.post.mockResolvedValue({ data: { token: "new-token" } });

    await expect(AuthService.refreshToken("refresh-token")).resolves.toEqual({
      token: "new-token",
    });
  });
});
