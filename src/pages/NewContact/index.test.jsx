import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import NewContact from ".";
import useNewContact from "./useNewContact";

vi.mock("./useNewContact", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/PageHeader", () => ({
  default: ({ title, backTo }) => (
    <div>
      <h1>{title}</h1>
      <span>{backTo}</span>
    </div>
  ),
}));

vi.mock("../../components/ContactForm", () => ({
  default: ({ buttonLabel, onSubmit }) => (
    <button type="button" onClick={() => onSubmit({ name: "Contato" })}>
      Mock ContactForm {buttonLabel}
    </button>
  ),
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("NewContact page", () => {
  beforeEach(() => {
    useNewContact.mockReturnValue({
      contactFormRef: { current: null },
      handleSubmit: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders page header and contact form", () => {
    renderWithTheme(<NewContact />);

    expect(screen.getByRole("heading", { name: /novo contato/i })).toBeInTheDocument();
    expect(screen.getByText("/")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mock contactform cadastrar/i })).toBeInTheDocument();
  });

  it("wires submit handler to ContactForm", () => {
    const handleSubmit = vi.fn();
    useNewContact.mockReturnValue({
      contactFormRef: { current: null },
      handleSubmit,
    });

    renderWithTheme(<NewContact />);

    fireEvent.click(screen.getByRole("button", { name: /mock contactform cadastrar/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ name: "Contato" });
  });
});
