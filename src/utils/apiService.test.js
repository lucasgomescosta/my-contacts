import { vi } from "vitest";

import APIError from "../errors/APIError";
import apiClient from "./api.js";
import { get, post, put, remove } from "./apiService";

vi.mock("./api.js", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("apiService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns data from get", async () => {
    apiClient.get.mockResolvedValue({ data: { ok: true } });

    await expect(get("/contacts", { page: 1 })).resolves.toEqual({ ok: true });
    expect(apiClient.get).toHaveBeenCalledWith("/contacts", {
      params: { page: 1 },
    });
  });

  it("returns data from post", async () => {
    apiClient.post.mockResolvedValue({ data: { id: 1 } });

    await expect(post("/contacts", { name: "Alice" })).resolves.toEqual({ id: 1 });
  });

  it("throws APIError on network failures", async () => {
    const error = new Error("network failed");
    apiClient.get.mockRejectedValue(error);

    await expect(get("/contacts")).rejects.toBeInstanceOf(APIError);
  });

  it("throws response message on server errors", async () => {
    apiClient.get.mockRejectedValue({
      response: {
        status: 400,
        statusText: "Bad Request",
        data: { error: "Invalid data" },
      },
    });

    await expect(get("/contacts")).rejects.toThrow("Invalid data");
  });
});
