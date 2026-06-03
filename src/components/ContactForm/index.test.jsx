import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import ContactForm from ".";
import useContactForm from "./useContactForm";

vi.mock("./useContactForm", () => ({
  default: vi.fn(),
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("ContactForm", () => {
  beforeEach(() => {
    useContactForm.mockReturnValue({
      name: "",
      email: "",
      phone: "",
      categoryId: "",
      categories: [{ id: "1", name: "Família" }],
      isLoadingCategories: false,
      isSubmitting: false,
      getErrorMessageFieldName: vi.fn(() => null),
      isFormValid: true,
      handleSubmit: vi.fn((e) => e.preventDefault()),
      handleNameChange: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePhoneChange: vi.fn(),
      setCategoryId: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders contact fields and category options", () => {
    renderWithTheme(
      <ContactForm ref={createRef()} buttonLabel="Salvar" onSubmit={vi.fn()} />
    );

    expect(screen.getByPlaceholderText(/nome \*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e-mail \*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/telefone \*/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /sem categoria/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /família/i })).toBeInTheDocument();
  });

  it("calls setCategoryId when selecting a category", () => {
    const setCategoryId = vi.fn();
    useContactForm.mockReturnValue({
      name: "",
      email: "",
      phone: "",
      categoryId: "",
      categories: [{ id: "1", name: "Família" }],
      isLoadingCategories: false,
      isSubmitting: false,
      getErrorMessageFieldName: vi.fn(() => null),
      isFormValid: true,
      handleSubmit: vi.fn((e) => e.preventDefault()),
      handleNameChange: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePhoneChange: vi.fn(),
      setCategoryId,
    });

    renderWithTheme(
      <ContactForm ref={createRef()} buttonLabel="Salvar" onSubmit={vi.fn()} />
    );

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    expect(setCategoryId).toHaveBeenCalledWith("1");
  });

  it("calls submit handler when form is submitted", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    useContactForm.mockReturnValue({
      name: "",
      email: "",
      phone: "",
      categoryId: "",
      categories: [],
      isLoadingCategories: false,
      isSubmitting: false,
      getErrorMessageFieldName: vi.fn(() => null),
      isFormValid: true,
      handleSubmit,
      handleNameChange: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePhoneChange: vi.fn(),
      setCategoryId: vi.fn(),
    });

    renderWithTheme(
      <ContactForm ref={createRef()} buttonLabel="Salvar" onSubmit={vi.fn()} />
    );

    fireEvent.submit(screen.getByRole("button", { name: /salvar/i }).closest("form"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when form is invalid", () => {
    useContactForm.mockReturnValue({
      name: "",
      email: "",
      phone: "",
      categoryId: "",
      categories: [],
      isLoadingCategories: false,
      isSubmitting: false,
      getErrorMessageFieldName: vi.fn(() => null),
      isFormValid: false,
      handleSubmit: vi.fn((e) => e.preventDefault()),
      handleNameChange: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePhoneChange: vi.fn(),
      setCategoryId: vi.fn(),
    });

    renderWithTheme(
      <ContactForm ref={createRef()} buttonLabel="Salvar" onSubmit={vi.fn()} />
    );

    expect(screen.getByRole("button", { name: /salvar/i })).toBeDisabled();
  });
});
