import { vi } from "vitest";

import * as apiService from "../utils/apiService";
import ContactMapper from "./mappers/ContactMapper";
import {
  createContact,
  deleteContact,
  getContactById,
  listContacts,
  updateContact,
} from "./ContactsService";

vi.mock("../utils/apiService", () => ({
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  remove: vi.fn(),
}));

vi.mock("./mappers/ContactMapper", () => ({
  default: {
    toDomain: vi.fn((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      category: {
        id: contact.category_id,
        name: contact.category_name,
      },
    })),
    toPersistence: vi.fn((contact) => ({
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      category_id: contact.categoryId,
    })),
  },
}));

describe("ContactsService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lists contacts from array responses", async () => {
    apiService.get.mockResolvedValue([
      { id: 1, name: "Alice", email: "alice@example.com", phone: "111", category_id: 10 },
    ]);

    await expect(listContacts()).resolves.toEqual({
      contacts: [
        {
          id: 1,
          name: "Alice",
          email: "alice@example.com",
          phone: "111",
          category: { id: 10, name: undefined },
        },
      ],
      pagination: { page: 1, pageSize: 1, total: 1, totalPages: 1 },
    });
  });

  it("gets a contact by id", async () => {
    apiService.get.mockResolvedValue({
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "222",
      category_id: 20,
      category_name: "Family",
    });

    await expect(getContactById(2)).resolves.toEqual({
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      phone: "222",
      category: { id: 20, name: "Family" },
    });
  });

  it("creates, updates and deletes contacts", async () => {
    ContactMapper.toPersistence.mockReturnValue({ name: "Alice" });
    apiService.post.mockResolvedValue({ id: 3 });
    apiService.put.mockResolvedValue({ id: 3, name: "Alice" });
    apiService.remove.mockResolvedValue({});

    await expect(createContact({ name: "Alice" })).resolves.toEqual({ id: 3 });
    await expect(updateContact(3, { name: "Alice" })).resolves.toEqual({ id: 3, name: "Alice" });
    await expect(deleteContact(3)).resolves.toEqual({});
  });
});
