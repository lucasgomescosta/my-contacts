import { render } from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import defaultTheme from "../../assets/styles/themes/default";
import Spinner from ".";

function renderWithTheme(ui) {
  return render(<ThemeProvider theme={defaultTheme}>{ui}</ThemeProvider>);
}

describe("Spinner", () => {
  it("renders with default size", () => {
    const { container } = renderWithTheme(<Spinner />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    const { container } = renderWithTheme(<Spinner size={16} />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
