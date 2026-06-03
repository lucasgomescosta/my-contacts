import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import Categorias from ".";
import useCategorias from "./useCategorias";

vi.mock("./useCategorias", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/Loader", () => ({
  default: ({ isLoading }) => <div>{isLoading ? "Loading" : "Loaded"}</div>,
}));

vi.mock("../../components/Modal", () => ({
  default: ({ visible, title, onCancel, onConfirm }) =>
    visible ? (
      <div>
        <h2>{title}</h2>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="button" onClick={onConfirm}>Confirm</button>
      </div>
    ) : null,
}));

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

function makeCategoriasReturn(overrides = {}) {
  return {
    categories: [{ id: "1", name: "Família" }],
    total: 1,
    page: 1,
    totalPages: 2,
    pages: [1, 2],
    isLoading: false,
    isDeleteModalVisible: false,
    categoryBeingDeleted: null,
    isLoadingDeleting: false,
    handleCloseDeleteModal: vi.fn(),
    handleConfirmDeleteCategory: vi.fn(),
    handleDeleteCategory: vi.fn(),
    handlePrevPage: vi.fn(),
    handleNextPage: vi.fn(),
    handleGoToPage: vi.fn(),
    navigate: vi.fn(),
    ...overrides,
  };
}

describe("Categorias page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders list, count and new category action", () => {
    const navigate = vi.fn();
    useCategorias.mockReturnValue(makeCategoriasReturn({ navigate }));

    renderWithTheme(<Categorias />);

    expect(screen.getByRole("heading", { name: /categorias/i })).toBeInTheDocument();
    expect(screen.getByText(/1 categoria\(s\) cadastrada\(s\)/i)).toBeInTheDocument();
    expect(screen.getByText(/família/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /nova categoria/i }));
    expect(navigate).toHaveBeenCalledWith("/categorias/nova");
  });

  it("renders empty message when there are no categories", () => {
    useCategorias.mockReturnValue(
      makeCategoriasReturn({ categories: [], total: 0 })
    );

    renderWithTheme(<Categorias />);

    expect(screen.getByText(/nenhuma categoria cadastrada/i)).toBeInTheDocument();
  });

  it("wires edit and delete actions", () => {
    const navigate = vi.fn();
    const handleDeleteCategory = vi.fn();

    useCategorias.mockReturnValue(
      makeCategoriasReturn({ navigate, handleDeleteCategory })
    );

    renderWithTheme(<Categorias />);

    fireEvent.click(screen.getByRole("button", { name: /editar/i }));
    fireEvent.click(screen.getByRole("button", { name: /deletar/i }));

    expect(navigate).toHaveBeenCalledWith("/categorias/1/editar");
    expect(handleDeleteCategory).toHaveBeenCalledWith({ id: "1", name: "Família" });
  });

  it("renders delete modal and wires confirm/cancel", () => {
    const handleCloseDeleteModal = vi.fn();
    const handleConfirmDeleteCategory = vi.fn();

    useCategorias.mockReturnValue(
      makeCategoriasReturn({
        isDeleteModalVisible: true,
        categoryBeingDeleted: { id: "1", name: "Família" },
        handleCloseDeleteModal,
        handleConfirmDeleteCategory,
      })
    );

    renderWithTheme(<Categorias />);

    expect(screen.getByRole("heading", { name: /tem certeza que deseja remover a categoria/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(handleCloseDeleteModal).toHaveBeenCalledTimes(1);
    expect(handleConfirmDeleteCategory).toHaveBeenCalledTimes(1);
  });

  it("wires pagination actions", () => {
    const handlePrevPage = vi.fn();
    const handleNextPage = vi.fn();
    const handleGoToPage = vi.fn();

    useCategorias.mockReturnValue(
      makeCategoriasReturn({
        page: 2,
        totalPages: 3,
        pages: [1, 2, 3],
        handlePrevPage,
        handleNextPage,
        handleGoToPage,
      })
    );

    renderWithTheme(<Categorias />);

    fireEvent.click(screen.getByRole("button", { name: /anterior/i }));
    fireEvent.click(screen.getByRole("button", { name: /próxima/i }));
    fireEvent.click(screen.getByRole("button", { name: "3" }));

    expect(handlePrevPage).toHaveBeenCalledTimes(1);
    expect(handleNextPage).toHaveBeenCalledTimes(1);
    expect(handleGoToPage).toHaveBeenCalledWith(3);
  });
});
