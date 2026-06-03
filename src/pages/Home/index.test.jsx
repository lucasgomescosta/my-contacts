import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import Home from ".";
import useHome from "./useHome";

vi.mock("./useHome", () => ({
  default: vi.fn(),
}));

vi.mock("../../components/Loader", () => ({
  default: ({ isLoading }) => <div>{isLoading ? "Loading" : "Loaded"}</div>,
}));

vi.mock("./Components/InputSearch", () => ({
  default: ({ value, onChange, placeholder }) => (
    <input aria-label="Search" value={value} onChange={onChange} placeholder={placeholder} />
  ),
}));

vi.mock("./Components/Header", () => ({
  default: ({ quantityOfContacts, quantityOffilteredContacts, hasError }) => (
    <div>{`Header ${quantityOfContacts}-${quantityOffilteredContacts}-${hasError}`}</div>
  ),
}));

vi.mock("./Components/ErrorStatus", () => ({
  default: ({ onTryAgain }) => (
    <button type="button" onClick={onTryAgain}>Try Again</button>
  ),
}));

vi.mock("./Components/EmptyList", () => ({
  default: () => <div>Empty list</div>,
}));

vi.mock("./Components/SearchNotFound", () => ({
  default: ({ searchTerm }) => <div>{`Search not found: ${searchTerm}`}</div>,
}));

vi.mock("./Components/ContactsList", () => ({
  default: ({ filteredContacts, onToggleOrderBy, onDeleteContact }) => (
    <div>
      <span>{`Contacts: ${filteredContacts.length}`}</span>
      <button type="button" onClick={onToggleOrderBy}>Toggle Order</button>
      <button type="button" onClick={() => onDeleteContact({ id: "1", name: "Maria" })}>Delete Contact</button>
    </div>
  ),
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

function makeHomeReturn(overrides = {}) {
  return {
    isLoading: false,
    contacts: [{ id: "1", name: "Maria" }],
    total: 1,
    page: 1,
    totalPages: 2,
    searchTerm: "",
    handleChangeSearchTerm: vi.fn(),
    hasError: false,
    handleTryAgain: vi.fn(),
    filteredContacts: [{ id: "1", name: "Maria" }],
    handleToggleOrderBy: vi.fn(),
    orderBy: "asc",
    handleDeleteContact: vi.fn(),
    isDeleteModalVisible: false,
    contactBeingDeleted: null,
    handleCloseDeleteModal: vi.fn(),
    handleConfirmDeleteContact: vi.fn(),
    isLoadingDeleting: false,
    handlePrevPage: vi.fn(),
    handleNextPage: vi.fn(),
    handleGoToPage: vi.fn(),
    pages: [1, 2],
    ...overrides,
  };
}

describe("Home page", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders contacts list and pagination when there are contacts", () => {
    useHome.mockReturnValue(makeHomeReturn());

    renderWithTheme(<Home />);

    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByText(/contacts: 1/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /anterior/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /próxima/i })).toBeInTheDocument();
  });

  it("renders error state and retries", () => {
    const handleTryAgain = vi.fn();
    useHome.mockReturnValue(
      makeHomeReturn({
        hasError: true,
        total: 0,
        contacts: [],
        filteredContacts: [],
        handleTryAgain,
      })
    );

    renderWithTheme(<Home />);

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(handleTryAgain).toHaveBeenCalledTimes(1);
  });

  it("renders empty list when no contacts", () => {
    useHome.mockReturnValue(
      makeHomeReturn({
        total: 0,
        contacts: [],
        filteredContacts: [],
      })
    );

    renderWithTheme(<Home />);

    expect(screen.getByText(/empty list/i)).toBeInTheDocument();
  });

  it("renders search not found state", () => {
    useHome.mockReturnValue(
      makeHomeReturn({
        total: 2,
        contacts: [{ id: "1", name: "Maria" }, { id: "2", name: "Ana" }],
        filteredContacts: [],
        searchTerm: "xpto",
      })
    );

    renderWithTheme(<Home />);

    expect(screen.getByText(/search not found: xpto/i)).toBeInTheDocument();
  });

  it("renders delete modal and wires actions", () => {
    const handleCloseDeleteModal = vi.fn();
    const handleConfirmDeleteContact = vi.fn();

    useHome.mockReturnValue(
      makeHomeReturn({
        isDeleteModalVisible: true,
        contactBeingDeleted: { id: "1", name: "Maria" },
        handleCloseDeleteModal,
        handleConfirmDeleteContact,
      })
    );

    renderWithTheme(<Home />);

    expect(screen.getByRole("heading", { name: /tem certeza que deseja remover o contato/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(handleCloseDeleteModal).toHaveBeenCalledTimes(1);
    expect(handleConfirmDeleteContact).toHaveBeenCalledTimes(1);
  });
});
