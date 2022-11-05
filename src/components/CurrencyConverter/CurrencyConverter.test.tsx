import { fireEvent, render, screen } from "@testing-library/react";
import { CurrencyConverter } from "./CurrencyConverter";
import type { CurrencyChartProps } from "../CurrencyChart/CurrencyChart";
import type { CurrencySelectorProps } from "../CurrencySelector/CurrencySelector";
import type { SpinnerProps } from "../Spinner/Spinner";

const mockSpinner = vi.fn();
vi.mock("../Spinner/Spinner", () => ({
  Spinner: (props: SpinnerProps) => mockSpinner(props),
}));

const mockCurrencySelector = vi.fn();
vi.mock("../CurrencySelector/CurrencySelector", () => ({
  CurrencySelector: (props: CurrencySelectorProps) =>
    mockCurrencySelector(props),
}));

const mockCurrencyChart = vi.fn();
vi.mock("../CurrencyChart/CurrencyChart", () => ({
  CurrencyChart: (props: CurrencyChartProps) => mockCurrencyChart(props),
}));

const sampleCurrencyList = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
];

test("Renders currency converter", () => {
  const mockSetFromValue = vi.fn();
  const mockSetFromCurrency = vi.fn();
  const mockSetToCurrency = vi.fn();
  const mockSwapCurrencies = vi.fn();

  render(
    <CurrencyConverter
      currencyList={sampleCurrencyList}
      fromValue="100"
      toValue="120"
      setFromValue={mockSetFromValue}
      fromCurrency="EUR"
      setFromCurrency={mockSetFromCurrency}
      toCurrency="USD"
      setToCurrency={mockSetToCurrency}
      swapCurrencies={mockSwapCurrencies}
      exchangeRatesByDate={{ "2022-12-01": 1.2, "2022-12-02": 1.27 }}
    />
  );

  const amountLabel = screen.getByLabelText("Enter amount");
  expect(amountLabel).toHaveValue(100);

  expect(screen.getByTestId("conversion-result")).toHaveTextContent(
    "100.00 Euro =120.00 United States Dollar"
  );

  expect(mockSpinner).not.toBeCalled();

  expect(mockCurrencySelector).toBeCalledTimes(2);
  expect(mockCurrencySelector).toBeCalledWith(
    expect.objectContaining({
      label: "From",
      value: "EUR",
      currencyList: sampleCurrencyList,
    })
  );
  expect(mockCurrencySelector).toBeCalledWith(
    expect.objectContaining({
      label: "To",
      value: "USD",
      currencyList: sampleCurrencyList,
    })
  );

  expect(mockCurrencyChart).toBeCalledWith(
    expect.objectContaining({
      data: [
        {
          date: "2022-12-01",
          rate: 1.2,
        },
        {
          date: "2022-12-02",
          rate: 1.27,
        },
      ],
    })
  );

  fireEvent.change(screen.getByRole("spinbutton", { name: "Enter amount" }), {
    target: { value: 123 },
  });
  expect(mockSetFromValue).toHaveBeenCalledTimes(1);
  expect(mockSetFromValue).toHaveBeenLastCalledWith("123");

  fireEvent.click(screen.getByRole("button", { name: "Swap currencies" }));
  expect(mockSwapCurrencies).toBeCalledTimes(1);

  mockCurrencySelector.mock.calls[0][0].onChange({ target: { value: "USD" } });
  expect(mockSetFromCurrency).toBeCalledTimes(1);
  expect(mockSetFromCurrency).toBeCalledWith("USD");

  mockCurrencySelector.mock.calls[1][0].onChange({ target: { value: "EUR" } });
  expect(mockSetToCurrency).toBeCalledTimes(1);
  expect(mockSetToCurrency).toBeCalledWith("EUR");
});

test("Renders loading spinner if currency list is undefined", () => {
  render(
    <CurrencyConverter
      currencyList={undefined}
      fromValue="100"
      toValue="120"
      setFromValue={() => {}}
      fromCurrency="EUR"
      setFromCurrency={() => {}}
      toCurrency="USD"
      setToCurrency={() => {}}
      swapCurrencies={() => {}}
      exchangeRatesByDate={{}}
    />
  );

  expect(mockSpinner).toBeCalledTimes(1);
  expect(mockSpinner).toBeCalledWith(
    expect.objectContaining({ title: "Loading available currencies" })
  );
});

test("Renders error message if the currency list is Error", () => {
  render(
    <CurrencyConverter
      currencyList={new Error()}
      fromValue="100"
      toValue="120"
      setFromValue={() => {}}
      fromCurrency="EUR"
      setFromCurrency={() => {}}
      toCurrency="USD"
      setToCurrency={() => {}}
      swapCurrencies={() => {}}
      exchangeRatesByDate={{}}
    />
  );

  expect(
    screen.getByText("Something went wrong, please try again later.")
  ).toBeInTheDocument();
});
