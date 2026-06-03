import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import PageHeader from ".";

function renderWithProviders(ui) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe("PageHeader", () => {
  it("renders the title", () => {
    renderWithProviders(<PageHeader title="Novo contato" backTo="/" />);

    expect(screen.getByRole("heading", { name: /novo contato/i })).toBeInTheDocument();
  });

  it("renders back link with correct destination", () => {
    renderWithProviders(<PageHeader title="Novo contato" backTo="/contatos" />);

    const link = screen.getByRole("link", { name: /voltar/i });
    expect(link).toHaveAttribute("href", "/contatos");
  });

  it("renders back arrow image", () => {
    renderWithProviders(<PageHeader title="Novo contato" backTo="/" />);

    expect(screen.getByRole("img", { name: /seta/i })).toBeInTheDocument();
  });
});
