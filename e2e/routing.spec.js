const { test, expect } = require("@playwright/test");

test.describe("Routing guards", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.clear();
    });
  });

  test("redirects unauthenticated users to sign-in", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveURL(/\/sign-in$/);
    await expect(page.getByRole("heading", { name: "Acesse sua conta" })).toBeVisible();
  });

  test("redirects unauthenticated users from private routes", async ({ page }) => {
    await page.goto("/categorias");

    await expect(page).toHaveURL(/\/sign-in$/);
    await expect(page.getByRole("heading", { name: "Acesse sua conta" })).toBeVisible();
  });
});
