import { format, sub } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type { CurrencyName } from "../typings/CurrencyName";
import type {
  SymbolsResponse,
  TimeseriesResponse,
} from "../typings/ExchangeRatesAPI";
import type { ExchangeRatesByDate } from "../typings/ExchangeRatesByDate";
import { useLocalStorage } from "./useLocalStorage";

// We can move that constants to a separate file if they will be reused,
// but I decided to leave them here for the simplicity
const EXCHANGE_API_URL = "https://api.apilayer.com/exchangerates_data/";

// Should be moved to the env variables or github secrets
// and used on the BE side as it can be stolen and reused now
const API_KEY = "ITmx6qHDk4jyEMePtBkTLLsGdq1dLgxm";

const apiLayerFetchHeaders = new Headers();
apiLayerFetchHeaders.append("apikey", API_KEY);
const requestOptions = {
  headers: apiLayerFetchHeaders,
};

/**
 * This hook loads the data from the exchange rates API https://exchangeratesapi.io/ .
 * @example
 * const [currencyList, getExchangeRatesForCurrencies] = useExchangeRate();
 * console.log(currencyList);
 * // [{code: "USD", name: "United States Dollar"}, {code: "EUR", name: "Euro"}]
 * getExchangeRatesForCurrencies("USD", "EUR");
 * // [{"2022-12-01": 1.2}, {"2022-12-02": 1.21, ...}]
 * @returns [currencyList, getExchangeRatesForCurrencies] - the currency list {CurrencyName[]} and the function to get the exchange rates between two currencies for the last month
 */
const useExchangeRate = () => {
  const [currencyList, setCurrencyList] = useState<Error | CurrencyName[]>();
  const [currencyListLocalStorage, setCurrencyListLocalStorage] =
    useLocalStorage("currency-list");
  const [timeseriesLocalStorage, setTimeseriesLocalStorage] =
    useLocalStorage("timeseries");
  const [timeseries, setTimeseries] = useState<{
    [timeseriesParameters: string]: ExchangeRatesByDate;
  }>({});

  useEffect(() => {
    if (!timeseriesLocalStorage) {
      return;
    }

    setTimeseries(JSON.parse(timeseriesLocalStorage));
  }, [timeseriesLocalStorage]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const symbolsResponse = await fetch(
          `${EXCHANGE_API_URL}symbols`,
          requestOptions
        );

        if (!symbolsResponse.ok) {
          throw new Error(symbolsResponse.statusText);
        }

        const symbolsJSON: SymbolsResponse = await symbolsResponse.json();
        if (!symbolsJSON.success) {
          throw new Error("API Error");
        }

        const currencyNames = Object.entries(symbolsJSON.symbols).map(
          ([code, name]) => ({ code, name })
        );

        setCurrencyList(currencyNames);
        setCurrencyListLocalStorage(JSON.stringify(currencyNames));
      } catch (error) {
        // Better to automatically log to Sentry or similar solution
        // eslint-disable-next-line no-console -- TODO: Add the proper errors handling
        console.error(`Can't get the list of currencies: ${error}`);
        setCurrencyList(new Error(error as string));
      }
    };

    if (currencyListLocalStorage) {
      setCurrencyList(JSON.parse(currencyListLocalStorage));
    } else {
      fetchCurrencies();
    }
  }, [currencyListLocalStorage, setCurrencyListLocalStorage]);

  const getExchangeRatesForCurrencies = useCallback(
    async (
      fromCurrencyCode: string,
      toCurrencyCode: string
    ): Promise<ExchangeRatesByDate | undefined> => {
      const fromDate = format(sub(new Date(), { months: 1 }), "yyyy-MM-dd");
      const todayDate = format(new Date(), "yyyy-MM-dd");
      const timeseriesParameters = `start_date=${fromDate}&end_date=${todayDate}&base=${fromCurrencyCode}&symbols=${toCurrencyCode}`;

      const fetchExchangeRates = async () => {
        try {
          const ratesResponse = await fetch(
            `${EXCHANGE_API_URL}timeseries?${timeseriesParameters}`,
            requestOptions
          );

          if (!ratesResponse.ok) {
            throw new Error(ratesResponse.statusText);
          }

          const ratesJSON: TimeseriesResponse = await ratesResponse.json();

          if (!ratesJSON.success) {
            throw new Error("API Error");
          }

          const transformedRates: ExchangeRatesByDate = {};
          Object.entries(ratesJSON.rates).forEach(([date, value]) => {
            transformedRates[date] = value[toCurrencyCode];
          });

          return transformedRates;
        } catch (error) {
          // Better to automatically log to Sentry or similar solution
          // eslint-disable-next-line no-console -- TODO: Add the proper errors handling
          console.error(`Can't get exchange rates ${error}`);

          return new Error();
        }
      };

      const exchangeRatesFromLocalStorage = timeseries[timeseriesParameters];

      if (exchangeRatesFromLocalStorage) {
        return exchangeRatesFromLocalStorage;
      }

      const exchangeRates = await fetchExchangeRates();

      if (exchangeRates instanceof Error) {
        return undefined;
      }

      const newTimeseries = {
        ...timeseries,
        [timeseriesParameters]: exchangeRates,
      };
      setTimeseries(newTimeseries);
      setTimeseriesLocalStorage(JSON.stringify(newTimeseries));

      return exchangeRates;
    },
    [setTimeseriesLocalStorage, timeseries]
  );

  return [currencyList, getExchangeRatesForCurrencies] as const;
};

export { useExchangeRate };
