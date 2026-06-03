import CategoryMapper from "./CategoryMapper";

describe("CategoryMapper", () => {
  it("maps domain category to persistence format", () => {
    expect(
      CategoryMapper.toPersistence({ id: 1, name: "Work" })
    ).toEqual({
      id: 1,
      name: "Work",
    });
  });

  it("maps persistence category to domain format", () => {
    expect(
      CategoryMapper.toDomain({ id: 2, name: "Personal" })
    ).toEqual({
      id: 2,
      name: "Personal",
    });
  });
});
