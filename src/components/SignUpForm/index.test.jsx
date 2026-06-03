import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import SignUpForm from ".";
import useSignUpForm from "./useSignUpForm";

vi.mock("./useSignUpForm", () => ({
  default: vi.fn(),
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("SignUpForm", () => {
  beforeEach(() => {
    useSignUpForm.mockReturnValue({
      name: "",
      email: "",
      password: "",
      isSubmitting: false,
      isFormValid: true,
      getErrorMessageFieldName: vi.fn(() => null),
      handleNameChange: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit: vi.fn((e) => e.preventDefault()),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders all required fields", () => {
    renderWithTheme(<SignUpForm buttonLabel="Criar conta" onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText(/nome completo \*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e-mail \*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha \*/i)).toBeInTheDocument();
  });

  it("renders submit button with label", () => {
    renderWithTheme(<SignUpForm buttonLabel="Criar conta" onSubmit={vi.fn()} />);

    expect(screen.getByRole("button", { name: /criar conta/i })).toBeInTheDocument();
  });

  it("calls hook submit handler on form submit", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    useSignUpForm.mockReturnValue({
      name: "",
      email: "",
      password: "",
      isSubmitting: false,
      isFormValid: true,
      getErrorMessageFieldName: vi.fn(() => null),
      handleNameChange: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit,
    });

    const { container } = renderWithTheme(
      <SignUpForm buttonLabel="Criar conta" onSubmit={vi.fn()} />
    );

    fireEvent.submit(container.querySelector("form"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when form is invalid", () => {
    useSignUpForm.mockReturnValue({
      name: "",
      email: "",
      password: "",
      isSubmitting: false,
      isFormValid: false,
      getErrorMessageFieldName: vi.fn(() => null),
      handleNameChange: vi.fn(),
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit: vi.fn((e) => e.preventDefault()),
    });

    renderWithTheme(<SignUpForm buttonLabel="Criar conta" onSubmit={vi.fn()} />);

    expect(screen.getByRole("button", { name: /criar conta/i })).toBeDisabled();
  });
});
