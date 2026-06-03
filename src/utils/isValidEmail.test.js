import isValidEmail from "./isValidEmail";

describe("isValidEmail", () => {
  it("accepts a valid email", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(isValidEmail("user@@example")).toBe(false);
  });
});
