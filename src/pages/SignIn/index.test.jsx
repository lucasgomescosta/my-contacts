import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import { SignIn } from ".";
import useSignIn from "./useSignIn";

vi.mock("./useSignIn", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/SignInForm", () => ({
  default: ({ buttonLabel, onSubmit }) => (
    <button type="button" onClick={() => onSubmit({ email: "user@mail.com", password: "123456" })}>
      Mock SignInForm {buttonLabel}
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

describe("SignIn page", () => {
  beforeEach(() => {
    useSignIn.mockReturnValue({
      handleSubmit: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders title, description and sign-up link", () => {
    renderWithProviders(<SignIn />);

    expect(screen.getByRole("heading", { name: /acesse sua conta/i })).toBeInTheDocument();
    expect(screen.getByText(/entre para gerenciar contatos e categorias/i)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /criar conta/i });
    expect(link).toHaveAttribute("href", "/sign-up");
  });

  it("wires page submit handler to SignInForm", () => {
    const handleSubmit = vi.fn();
    useSignIn.mockReturnValue({ handleSubmit });

    renderWithProviders(<SignIn />);

    fireEvent.click(screen.getByRole("button", { name: /mock signinform entrar/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ email: "user@mail.com", password: "123456" });
  });
});
