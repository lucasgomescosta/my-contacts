import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import CategoryEdit from ".";
import useCategoryEdit from "./useCategoryEdit";

vi.mock("./useCategoryEdit", () => ({
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

vi.mock("../../components/CategoryForm", () => ({
  default: ({ buttonLabel, onSubmit }) => (
    <button type="button" onClick={() => onSubmit({ name: "Categoria Editada" })}>
      Mock CategoryForm {buttonLabel}
    </button>
  ),
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("CategoryEdit page", () => {
  beforeEach(() => {
    useCategoryEdit.mockReturnValue({
      isLoading: false,
      categoryName: "Amigos",
      categoryFormRef: { current: null },
      handleSubmit: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders editing title and form", () => {
    renderWithTheme(<CategoryEdit />);

    expect(screen.getByRole("heading", { name: /editar amigos/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mock categoryform salvar alterações/i })).toBeInTheDocument();
  });

  it("shows loading title when page is loading", () => {
    useCategoryEdit.mockReturnValue({
      isLoading: true,
      categoryName: "",
      categoryFormRef: { current: null },
      handleSubmit: vi.fn(),
    });

    renderWithTheme(<CategoryEdit />);

    expect(screen.getByRole("heading", { name: /carregando/i })).toBeInTheDocument();
    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  it("wires submit handler to CategoryForm", () => {
    const handleSubmit = vi.fn();
    useCategoryEdit.mockReturnValue({
      isLoading: false,
      categoryName: "Amigos",
      categoryFormRef: { current: null },
      handleSubmit,
    });

    renderWithTheme(<CategoryEdit />);

    fireEvent.click(screen.getByRole("button", { name: /mock categoryform salvar alterações/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ name: "Categoria Editada" });
  });
});
