import formatPhone from "./formatPhone";

describe("formatPhone", () => {
  it("formats a 11-digit phone number", () => {
    expect(formatPhone("11999998888")).toBe("(11) 99999-8888");
  });

  it("keeps values with more than 11 digits as plain numbers", () => {
    expect(formatPhone("1199999888800")).toBe("1199999888800");
  });
});