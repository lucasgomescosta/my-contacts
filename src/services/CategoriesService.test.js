import { vi } from "vitest";

import * as apiService from "../utils/apiService";
import CategoryMapper from "./mappers/CategoryMapper";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategoryByName,
  listAllCategories,
  listCategories,
  updateCategory,
} from "./CategoriesService";

vi.mock("../utils/apiService", () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  remove: vi.fn(),
}));

vi.mock("./mappers/CategoryMapper", () => ({
  default: {
    toDomain: vi.fn((category) => ({
      id: category.id,
      name: category.name,
    })),
    toPersistence: vi.fn((category) => ({
      id: category.id,
      name: category.name,
    })),
  },
}));

describe("CategoriesService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists categories from array responses", async () => {
    apiService.get.mockResolvedValue([
      { id: 1, name: "Work" },
      { id: 2, name: "Home" },
    ]);

    await expect(listCategories()).resolves.toEqual({
      categories: [
        { id: 1, name: "Work" },
        { id: 2, name: "Home" },
      ],
      pagination: { total: 2, page: 1, pageSize: 2, totalPages: 1 },
    });
  });

  it("creates a category using the mapper", async () => {
    CategoryMapper.toPersistence.mockReturnValue({ name: "Work" });
    apiService.post.mockResolvedValue({ id: 3, name: "Work" });

    await expect(createCategory({ name: "Work" })).resolves.toEqual({
      id: 3,
      name: "Work",
    });
  });

  it("returns all categories from paginated responses", async () => {
    apiService.get.mockResolvedValue({
      data: [{ id: 4, name: "Travel" }],
      pagination: { total: 1, totalPages: 1, page: 1, pageSize: 10 },
    });

    await expect(listAllCategories()).resolves.toEqual([{ id: 4, name: "Travel" }]);
  });

  it("gets a category by id", async () => {
    apiService.get.mockResolvedValue({ id: 5, name: "Study" });

    await expect(getCategoryById(5)).resolves.toEqual({ id: 5, name: "Study" });
  });

  it("updates and deletes categories", async () => {
    apiService.put.mockResolvedValue({ id: 6, name: "Family" });
    apiService.remove.mockResolvedValue({});

    await expect(updateCategory(6, { name: "Family" })).resolves.toEqual({
      id: 6,
      name: "Family",
    });

    await expect(deleteCategory(6)).resolves.toBeUndefined();
  });

  it("searches categories by name", async () => {
    apiService.get.mockResolvedValue({ data: [{ id: 7, name: "Fitness" }] });

    await expect(getCategoryByName("Fit")).resolves.toEqual([
      { id: 7, name: "Fitness" },
    ]);
  });
});
