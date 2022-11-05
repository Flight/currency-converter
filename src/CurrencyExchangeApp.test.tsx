import { render, screen } from "@testing-library/react";
import { CurrencyExchangeApp } from "./CurrencyExchangeApp";

const mockConverter = vi.fn();
vi.mock("./components/CurrencyConverter/CurrencyConverter", () => ({
  CurrencyConverter: () => mockConverter(),
}));

render(<CurrencyExchangeApp />);

test("Currency Exchange App loads and fires events", async () => {
  expect(
    screen.getByRole("heading", { name: "Currency exchange" })
  ).toBeInTheDocument();
  expect(mockConverter).toHaveBeenCalledTimes(1);
});
