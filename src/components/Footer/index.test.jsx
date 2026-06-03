import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import Footer from ".";

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("Footer", () => {
  it("renders current year and app name", () => {
    renderWithTheme(<Footer />);

    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`${currentYear} MyContacts`))).toBeInTheDocument();
  });

  it("renders author text", () => {
    renderWithTheme(<Footer />);

    expect(screen.getByText(/desenvolvido por lucas gomes/i)).toBeInTheDocument();
  });
});
