import { act, renderHook, waitFor } from "@testing-library/react";
import { useExchangeRate } from "./useExchangeRate";

vi.setSystemTime("2022-12-31");

const mockUseLocalStorageSet = vi.fn();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockUseLocalStorage = vi.fn((key: string) => [
  null,
  mockUseLocalStorageSet,
]);
vi.mock("./useLocalStorage", () => ({
  useLocalStorage: (key: string) => mockUseLocalStorage(key),
}));

const mockFetch = vi.fn(() => ({
  ok: true,
  json: () => ({
    success: true,
    symbols: {
      EUR: "Euro",
      USD: "United States Dollar",
    },
    rates: {
      "2022-12-30": { USD: 23.123 },
      "2022-12-31": { USD: 24 },
    },
  }),
}));
beforeEach(() => {
  Object.defineProperty(window, "fetch", {
    value: mockFetch,
  });
});

const expectedConvertedResult = [
  {
    code: "EUR",
    name: "Euro",
  },
  {
    code: "USD",
    name: "United States Dollar",
  },
];

test("Gets the currency list on init", async () => {
  const { result } = renderHook(() => useExchangeRate());
  let [currencyList] = result.current;

  expect(currencyList).toBeUndefined();

  await waitFor(() => {
    expect(mockFetch).toBeCalledTimes(1);
    expect(mockFetch).toBeCalledWith(
      "https://api.apilayer.com/exchangerates_data/symbols",
      {
        headers: expect.any(Headers),
      }
    );

    [currencyList] = result.current;

    expect(currencyList).toStrictEqual(expectedConvertedResult);
    expect(mockUseLocalStorage).toBeCalled();
    expect(mockUseLocalStorage).toHaveBeenCalledWith("currency-list");
    expect(mockUseLocalStorage).toHaveBeenCalledWith("timeseries");

    expect(mockUseLocalStorageSet).toHaveBeenCalledTimes(1);
    expect(mockUseLocalStorageSet).toHaveBeenCalledWith(
      JSON.stringify(expectedConvertedResult)
    );
  });
});

test("Gets the exchange rates on call", async () => {
  const { result } = renderHook(() => useExchangeRate());
  const getExchangeRatesForCurrencies = result.current[1];
  let exchangeRates;

  await act(async () => {
    exchangeRates = await getExchangeRatesForCurrencies("EUR", "USD");
  });

  expect(mockFetch).toHaveBeenLastCalledWith(
    "https://api.apilayer.com/exchangerates_data/timeseries?start_date=2022-11-30&end_date=2022-12-31&base=EUR&symbols=USD",
    {
      headers: expect.any(Headers),
    }
  );

  expect(exchangeRates).toStrictEqual({
    "2022-12-30": 23.123,
    "2022-12-31": 24,
  });
});
