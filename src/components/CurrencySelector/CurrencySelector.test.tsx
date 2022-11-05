import { render, screen } from "@testing-library/react";
import { CurrencySelector } from "./CurrencySelector";

const mockOnChange = vi.fn();

test("Renders currency selector without selected value", () => {
  render(
    <CurrencySelector
      id="sampleCurrencySelector"
      label="Select currency"
      value={undefined}
      currencyList={[
        { code: "USD", name: "United States Dollar" },
        { code: "EUR", name: "Euro" },
      ]}
      onChange={mockOnChange}
    />
  );

  expect(screen.getByLabelText("Select currency")).toBeInTheDocument();
  expect(
    screen.getByRole("option", { name: "Please select", selected: true })
  ).toBeInTheDocument();
});

test("Renders currency selector with selected value", () => {
  render(
    <CurrencySelector
      id="sampleCurrencySelector"
      label="Select currency"
      value="EUR"
      currencyList={[
        { code: "USD", name: "United States Dollar" },
        { code: "EUR", name: "Euro" },
      ]}
      onChange={() => {}}
    />
  );

  expect(
    screen.getByRole("option", { name: "EUR - Euro", selected: true })
  ).toBeInTheDocument();
});
