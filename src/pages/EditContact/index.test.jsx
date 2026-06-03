import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import EditContact from ".";
import useEditContact from "./useEditContact";

vi.mock("./useEditContact", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/Loader", () => ({
  default: ({ isLoading }) => <div>{isLoading ? "Loading" : "Loaded"}</div>,
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
    <button type="button" onClick={() => onSubmit({ name: "Contato Editado" })}>
      Mock ContactForm {buttonLabel}
    </button>
  ),
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("EditContact page", () => {
  beforeEach(() => {
    useEditContact.mockReturnValue({
      isLoading: false,
      contactName: "Maria",
      contactFormRef: { current: null },
      handleSubmit: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders editing title and form", () => {
    renderWithTheme(<EditContact />);

    expect(screen.getByRole("heading", { name: /editar maria/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mock contactform salvar alterações/i })).toBeInTheDocument();
  });

  it("shows loading title when page is loading", () => {
    useEditContact.mockReturnValue({
      isLoading: true,
      contactName: "",
      contactFormRef: { current: null },
      handleSubmit: vi.fn(),
    });

    renderWithTheme(<EditContact />);

    expect(screen.getByRole("heading", { name: /carregando/i })).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("wires submit handler to ContactForm", () => {
    const handleSubmit = vi.fn();
    useEditContact.mockReturnValue({
      isLoading: false,
      contactName: "Maria",
      contactFormRef: { current: null },
      handleSubmit,
    });

    renderWithTheme(<EditContact />);

    fireEvent.click(screen.getByRole("button", { name: /mock contactform salvar alterações/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ name: "Contato Editado" });
  });
});
