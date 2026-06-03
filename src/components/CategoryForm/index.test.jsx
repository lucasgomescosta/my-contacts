import { createRef } from "react";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import CategoryForm from ".";

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("CategoryForm", () => {
  it("starts with submit button disabled", () => {
    renderWithTheme(<CategoryForm buttonLabel="Salvar" onSubmit={vi.fn()} />);

    expect(screen.getByRole("button", { name: /salvar/i })).toBeDisabled();
  });

  it("enables submit button after typing a valid name", () => {
    renderWithTheme(<CategoryForm buttonLabel="Salvar" onSubmit={vi.fn()} />);

    fireEvent.change(
      screen.getByPlaceholderText(/família, trabalho, amigos/i),
      { target: { value: "Família" } }
    );

    expect(screen.getByRole("button", { name: /salvar/i })).toBeEnabled();
  });

  it("calls onSubmit with form values", async () => {
    const onSubmit = vi.fn(() => Promise.resolve());
    renderWithTheme(<CategoryForm buttonLabel="Salvar" onSubmit={onSubmit} />);

    fireEvent.change(
      screen.getByPlaceholderText(/família, trabalho, amigos/i),
      { target: { value: "Trabalho" } }
    );

    fireEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ name: "Trabalho" });
    });
  });

  it("supports imperative ref methods", async () => {
    const ref = createRef();
    renderWithTheme(<CategoryForm ref={ref} buttonLabel="Salvar" onSubmit={vi.fn()} />);

    act(() => {
      ref.current.setFieldsValue({ name: "Amigos" });
    });
    await waitFor(() => {
      expect(screen.getByDisplayValue("Amigos")).toBeInTheDocument();
    });

    act(() => {
      ref.current.setFieldError("name", "Nome é obrigatório");
    });
    await waitFor(() => {
      expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    });

    act(() => {
      ref.current.clearFieldError("name");
    });
    await waitFor(() => {
      expect(screen.queryByText(/nome é obrigatório/i)).not.toBeInTheDocument();
    });

    act(() => {
      ref.current.resetFields();
    });
    await waitFor(() => {
      expect(screen.getByDisplayValue("")).toBeInTheDocument();
    });
  });
});
