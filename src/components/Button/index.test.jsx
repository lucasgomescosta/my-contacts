import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import Button from ".";

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("Button", () => {
  it("renders the label", () => {
    renderWithTheme(<Button>Salvar</Button>);

    expect(screen.getByRole("button", { name: /salvar/i })).toBeInTheDocument();
  });

  it("is disabled and hides label while loading", () => {
    renderWithTheme(<Button $isLoading>Salvar</Button>);

    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    expect(screen.queryByText(/salvar/i)).not.toBeInTheDocument();
  });

  it("applies the danger variant", () => {
    renderWithTheme(<Button $danger>Deletar</Button>);

    expect(screen.getByRole("button", { name: /deletar/i })).toBeInTheDocument();
  });
});
