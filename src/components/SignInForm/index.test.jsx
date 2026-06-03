import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import SignInForm from ".";
import useSignInForm from "./useSignInForm";

vi.mock("./useSignInForm", () => ({
  default: vi.fn(),
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("SignInForm", () => {
  beforeEach(() => {
    useSignInForm.mockReturnValue({
      email: "",
      password: "",
      isSubmitting: false,
      isFormValid: true,
      getErrorMessageFieldName: vi.fn(() => null),
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit: vi.fn((e) => e.preventDefault()),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders email and password fields", () => {
    renderWithTheme(<SignInForm buttonLabel="Entrar" onSubmit={vi.fn()} />);

    expect(screen.getByPlaceholderText(/e-mail \*/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha \*/i)).toBeInTheDocument();
  });

  it("renders submit button with label", () => {
    renderWithTheme(<SignInForm buttonLabel="Entrar" onSubmit={vi.fn()} />);

    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  it("calls hook submit handler on form submit", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    useSignInForm.mockReturnValue({
      email: "",
      password: "",
      isSubmitting: false,
      isFormValid: true,
      getErrorMessageFieldName: vi.fn(() => null),
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit,
    });

    const { container } = renderWithTheme(
      <SignInForm buttonLabel="Entrar" onSubmit={vi.fn()} />
    );

    fireEvent.submit(container.querySelector("form"));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("disables submit button when form is invalid", () => {
    useSignInForm.mockReturnValue({
      email: "",
      password: "",
      isSubmitting: false,
      isFormValid: false,
      getErrorMessageFieldName: vi.fn(() => null),
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
      handleSubmit: vi.fn((e) => e.preventDefault()),
    });

    renderWithTheme(<SignInForm buttonLabel="Entrar" onSubmit={vi.fn()} />);

    expect(screen.getByRole("button", { name: /entrar/i })).toBeDisabled();
  });
});
