import { format, sub } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import type {
  CurrencyName,
  ExchangeRates,
  SymbolsResponse,
  TimeSeriesResponse,
} from "../typings/ExchangeRates";
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

const useExchangeRate = () => {
  const [currencyList, setCurrencyList] = useState<Error | CurrencyName[]>();
  const [currencyListLocalStorage, setCurrencyListLocalStorage] =
    useLocalStorage("currency-list");
  const [timeseriesLocalStorage, setTimeseriesLocalStorage] =
    useLocalStorage("timeseries");
  const [timeseries, setTimeseries] = useState<{
    [timeseriesParameters: string]: ExchangeRates;
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
    ): Promise<ExchangeRates> => {
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

          const ratesJSON: TimeSeriesResponse = await ratesResponse.json();

          if (!ratesJSON.success) {
            throw new Error("API Error");
          }

          return ratesJSON.rates;
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
