import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import CategoryNew from ".";
import useCategoryNew from "./useCategoryNew";

vi.mock("./useCategoryNew", () => ({
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

vi.mock("../../components/CategoryForm", () => ({
  default: ({ buttonLabel, onSubmit }) => (
    <button type="button" onClick={() => onSubmit({ name: "Nova categoria" })}>
      Mock CategoryForm {buttonLabel}
    </button>
  ),
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("CategoryNew page", () => {
  beforeEach(() => {
    useCategoryNew.mockReturnValue({
      categoryFormRef: { current: null },
      handleSubmit: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders page header and category form", () => {
    renderWithTheme(<CategoryNew />);

    expect(screen.getByRole("heading", { name: /nova categoria/i })).toBeInTheDocument();
    expect(screen.getByText("/categorias")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /mock categoryform cadastrar/i })).toBeInTheDocument();
  });

  it("wires submit handler to CategoryForm", () => {
    const handleSubmit = vi.fn();
    useCategoryNew.mockReturnValue({
      categoryFormRef: { current: null },
      handleSubmit,
    });

    renderWithTheme(<CategoryNew />);

    fireEvent.click(screen.getByRole("button", { name: /mock categoryform cadastrar/i }));

    expect(handleSubmit).toHaveBeenCalledWith({ name: "Nova categoria" });
  });
});
