import { render, screen } from "@testing-library/react";
import { CurrencyExchangeApp } from "./CurrencyExchangeApp";

const mockCurrencyConverterApp = vi.fn();
vi.mock("./components/CurrencyConverter/CurrencyConverterApp", () => ({
  CurrencyConverterApp: () => mockCurrencyConverterApp(),
}));

render(<CurrencyExchangeApp />);

test("Currency Exchange App loads and fires events", () => {
  expect(
    screen.getByRole("heading", { name: "Currency exchange" })
  ).toBeInTheDocument();
  expect(mockCurrencyConverterApp).toHaveBeenCalledTimes(1);
});
