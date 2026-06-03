import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import { AuthGuard } from "./AuthGuard";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth", () => ({
  useAuth: vi.fn(),
}));

function renderGuard({ signedIn, isPrivate }) {
  useAuth.mockReturnValue({ signedIn });

  return render(
    <MemoryRouter initialEntries={["/target"]}>
      <Routes>
        <Route
          path="/target"
          element={(
            <AuthGuard isPrivate={isPrivate}>
              <div>protected-content</div>
            </AuthGuard>
          )}
        />
        <Route path="/" element={<div>home-page</div>} />
        <Route path="/sign-in" element={<div>sign-in-page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("AuthGuard", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("redirects signed-in users away from public pages", () => {
    renderGuard({ signedIn: true, isPrivate: false });

    expect(screen.getByText("home-page")).toBeInTheDocument();
  });

  it("redirects signed-out users away from private pages", () => {
    renderGuard({ signedIn: false, isPrivate: true });

    expect(screen.getByText("sign-in-page")).toBeInTheDocument();
  });

  it("renders children on allowed access for private pages", () => {
    renderGuard({ signedIn: true, isPrivate: true });

    expect(screen.getByText("protected-content")).toBeInTheDocument();
  });

  it("renders children on allowed access for public pages", () => {
    renderGuard({ signedIn: false, isPrivate: false });

    expect(screen.getByText("protected-content")).toBeInTheDocument();
  });
});
