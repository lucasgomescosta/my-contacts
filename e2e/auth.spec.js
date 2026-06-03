const { test, expect } = require("@playwright/test");

async function mockCommonDataEndpoints(page) {
  // Home consulta contatos e categorias logo apos autenticar.
  // Aqui respondemos com listas vazias para o teste ficar isolado do backend real.
  await page.route("**/contacts**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: [
          {
            "id": "b88e272a-cb4d-4e7d-84a5-f401a30fa6c1",
            "name": "teste",
            "email": "teste@teste.com",
            "phone": "(11) 92441-4544",
            "category_id": "c3378c9f-6b19-40b1-bff2-5ba146bdbebf",
            "category_name": "Categoria 12",
            "user_id": "31f4b9d3-2208-4787-af25-3d9b1c703b8b"
          },
          {
            "id": "7dfe87c2-56ad-4a45-9d24-80a80f999101",
            "name": "Lucas Gomes",
            "email": "lucas.gomes@email.com",
            "phone": "(95) 99141-5513",
            "category_id": "57edb522-09ae-437e-b3df-2071867af6bb",
            "category_name": "Categoria 10",
            "user_id": "31f4b9d3-2208-4787-af25-3d9b1c703b8b"
          }
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
          totalPages: 1,
        },
      }),
    });
  });

  await page.route("**/categories**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        data: [
          {
            "id": "10e08243-28d2-4044-a740-9fc653372964",
            "name": "Categoria 1"
          },
          {
            "id": "57edb522-09ae-437e-b3df-2071867af6bb",
            "name": "Categoria 10"
          },
          {
            "id": "fe3e5635-f93b-4f9f-8ec4-c6800445a4e8",
            "name": "Categoria 100"
          },
          {
            "id": "922b4b0a-9a2f-4c6e-a25a-9a4da07e9592",
            "name": "Categoria 11"
          },
          {
            "id": "c3378c9f-6b19-40b1-bff2-5ba146bdbebf",
            "name": "Categoria 12"
          },
          {
            "id": "abe68329-b2ec-402d-abd4-ddf73722fff8",
            "name": "Categoria 13"
          },
          {
            "id": "60205ebf-6922-4f2a-b672-e02af1012d9c",
            "name": "Categoria 14"
          },
          {
            "id": "e94bead6-0b6d-4776-8983-be8ee7044f6e",
            "name": "Categoria 15"
          },
          {
            "id": "35e0a79c-9975-488f-ac7e-95e3c8086c1a",
            "name": "Categoria 16"
          },
          {
            "id": "a7e4125b-7206-4be7-aeec-86eb6e10fe18",
            "name": "Categoria 17"
          }
        ],
        pagination: {
          page: 1,
          pageSize: 10,
          total: 0,
          totalPages: 1,
        },
      }),
    });
  });
}

test.describe("Auth flows", () => {
  test.beforeEach(async ({ page }) => {
    // Garante que cada teste começa sem sessao persistida.
    await page.addInitScript(() => {
      localStorage.clear();
    });

    // Mock dos endpoints carregados apos login/cadastro.
    await mockCommonDataEndpoints(page);
  });

  test("sign-in succeeds and lands on home", async ({ page }) => {
    // Mock do endpoint de autenticacao com payload de sessao valido.
    await page.route("**/auth/signin", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          accessToken: "access-token",
          refreshToken: "refresh-token",
          user: {
            name: "Lucas",
            role: "Usuário",
            email: "lucas@example.com",
          },
        }),
      });
    });

    await page.goto("/sign-in");

    // Simula o preenchimento real do formulario pelo usuario.
    await page.getByPlaceholder("E-mail *").fill("lucas@example.com");
    await page.getByPlaceholder("Senha *").fill("123456");
    await page.getByRole("button", { name: "Entrar" }).click();

    // Valida redirecionamento e sinais visiveis de sessao autenticada.
    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("main").getByRole("link", { name: "Novo contato" })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Sair" })).toBeVisible();
  });

  test("sign-up succeeds and authenticates user", async ({ page }) => {
    // Primeiro mocka o cadastro...
    await page.route("**/auth/signup", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({ id: "u-1" }),
      });
    });

    // ...depois mocka o sign-in automatico executado apos criar a conta.
    await page.route("**/auth/signin", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          accessToken: "new-access-token",
          refreshToken: "new-refresh-token",
          user: {
            name: "Maria",
            role: "Usuário",
            email: "maria@example.com",
          },
        }),
      });
    });

    await page.goto("/sign-up");

    // Fluxo completo de cadastro preenchido pela interface.
    await page.getByPlaceholder("Nome completo *").fill("Maria");
    await page.getByPlaceholder("E-mail *").fill("maria@example.com");
    await page.getByPlaceholder("Senha *").fill("123456");
    await page.getByRole("button", { name: "Criar conta" }).click();

    // Confirma que o usuario terminou autenticado e na Home.
    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("button", { name: "Sair" })).toBeVisible();
  });
});
