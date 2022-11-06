import { act, render, waitFor } from "@testing-library/react";
import type { CurrencyName } from "../../typings/CurrencyName";
import type { ExchangeRatesByDate } from "../../typings/ExchangeRatesByDate";
import type { CurrencyConverterProps } from "./CurrencyConverter";
import { CurrencyConverterApp } from "./CurrencyConverterApp";

vi.setSystemTime("2022-12-31");

const mockCurrencyConverter = vi.fn();
vi.mock("./CurrencyConverter", () => ({
  CurrencyConverter: (props: CurrencyConverterProps) =>
    mockCurrencyConverter(props),
}));

const sampleCurrencyList: CurrencyName[] = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
];

const sampleExchangeRates: ExchangeRatesByDate = {
  "2022-12-30": 1.2,
  "2022-12-31": 1.3,
};

const mockGetExchangeRatesForCurrencies = vi.fn(
  (): Promise<ExchangeRatesByDate> => Promise.resolve(sampleExchangeRates)
);

vi.mock("../../hooks/useExchangeRate", () => ({
  useExchangeRate: () =>
    [sampleCurrencyList, mockGetExchangeRatesForCurrencies] as const,
}));

test("Renders the initial and the converted state of the CurrencyConverter component", async () => {
  render(<CurrencyConverterApp />);

  expect(mockCurrencyConverter).toHaveBeenCalledTimes(1);
  expect(mockCurrencyConverter).toHaveBeenCalledWith(
    expect.objectContaining({
      currencyList: sampleCurrencyList,
      fromValue: "100",
      toValue: undefined,
      fromCurrency: undefined,
      toCurrency: undefined,
      exchangeRatesByDate: undefined,
    })
  );

  act(() => {
    mockCurrencyConverter.mock.calls[0][0].setFromCurrency("EUR");
    mockCurrencyConverter.mock.calls[0][0].setToCurrency("USD");
  });

  expect(mockCurrencyConverter).toHaveBeenCalledTimes(2);
  expect(mockCurrencyConverter).toHaveBeenLastCalledWith(
    expect.objectContaining({
      currencyList: sampleCurrencyList,
      fromValue: "100",
      toValue: undefined,
      fromCurrency: "EUR",
      toCurrency: "USD",
      exchangeRatesByDate: undefined,
    })
  );

  await waitFor(() =>
    expect(mockGetExchangeRatesForCurrencies).toHaveBeenCalledTimes(1)
  );

  await waitFor(() => {
    expect(mockCurrencyConverter).toHaveBeenLastCalledWith(
      expect.objectContaining({
        currencyList: sampleCurrencyList,
        fromValue: "100",
        toValue: "130",
        fromCurrency: "EUR",
        toCurrency: "USD",
        exchangeRatesByDate: sampleExchangeRates,
      })
    );
  });

  act(() => {
    mockCurrencyConverter.mock.lastCall![0].swapCurrencies();
  });

  await waitFor(() =>
    expect(mockGetExchangeRatesForCurrencies).toHaveBeenCalledTimes(2)
  );

  await waitFor(() => {
    expect(mockCurrencyConverter).toHaveBeenLastCalledWith(
      expect.objectContaining({
        currencyList: sampleCurrencyList,
        fromValue: "100",
        toValue: "130",
        fromCurrency: "USD",
        toCurrency: "EUR",
        exchangeRatesByDate: sampleExchangeRates,
      })
    );
  });
});
