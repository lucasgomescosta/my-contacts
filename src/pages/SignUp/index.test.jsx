import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import { SignUp } from ".";
import useSignUp from "./useSignUp";

vi.mock("./useSignUp", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/SignUpForm", () => ({
  default: ({ buttonLabel, onSubmit }) => (
    <button type="button" onClick={() => onSubmit({ name: "Lucas", email: "user@mail.com", password: "123456" })}>
      Mock SignUpForm {buttonLabel}
    </button>
  ),
}));

function renderWithProviders(ui) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  );
}

describe("SignUp page", () => {
  beforeEach(() => {
    useSignUp.mockReturnValue({
      handleSubmit: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders title, description and sign-in link", () => {
    renderWithProviders(<SignUp />);

    expect(screen.getByRole("heading", { name: /crie sua conta/i })).toBeInTheDocument();
    expect(screen.getByText(/cadastre-se para acessar sua agenda de contatos/i)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /entrar/i });
    expect(link).toHaveAttribute("href", "/sign-in");
  });

  it("wires page submit handler to SignUpForm", () => {
    const handleSubmit = vi.fn();
    useSignUp.mockReturnValue({ handleSubmit });

    renderWithProviders(<SignUp />);

    fireEvent.click(screen.getByRole("button", { name: /mock signupform criar conta/i }));

    expect(handleSubmit).toHaveBeenCalledWith({
      name: "Lucas",
      email: "user@mail.com",
      password: "123456",
    });
  });
});
