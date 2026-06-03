import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import FormGroup from ".";

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("FormGroup", () => {
  it("renders children", () => {
    renderWithTheme(
      <FormGroup>
        <input aria-label="Nome" />
      </FormGroup>
    );

    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
  });

  it("renders error message when provided", () => {
    renderWithTheme(
      <FormGroup error="Campo obrigatório">
        <input aria-label="Nome" />
      </FormGroup>
    );

    expect(screen.getByText(/campo obrigatório/i)).toBeInTheDocument();
  });

  it("renders loader when isLoading is true", () => {
    const { container } = renderWithTheme(
      <FormGroup isLoading>
        <input aria-label="Nome" />
      </FormGroup>
    );

    expect(container.querySelector(".loader")).toBeInTheDocument();
  });

  it("does not render loader when isLoading is false", () => {
    const { container } = renderWithTheme(
      <FormGroup>
        <input aria-label="Nome" />
      </FormGroup>
    );

    expect(container.querySelector(".loader")).not.toBeInTheDocument();
  });
});
