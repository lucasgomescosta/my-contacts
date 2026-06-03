import ContactMapper from "./ContactMapper";

describe("ContactMapper", () => {
  it("maps domain contact to persistence format", () => {
    expect(
      ContactMapper.toPersistence({
        id: 3,
        name: "Alice",
        email: "alice@example.com",
        phone: "11999998888",
        categoryId: 7,
      })
    ).toEqual({
      id: 3,
      name: "Alice",
      email: "alice@example.com",
      phone: "11999998888",
      category_id: 7,
    });
  });

  it("maps persistence contact to domain format", () => {
    expect(
      ContactMapper.toDomain({
        id: 4,
        name: "Bob",
        email: "bob@example.com",
        phone: "11988887777",
        category_id: 8,
        category_name: "Family",
      })
    ).toEqual({
      id: 4,
      name: "Bob",
      email: "bob@example.com",
      phone: "11988887777",
      category: {
        id: 8,
        name: "Family",
      },
    });
  });
});
