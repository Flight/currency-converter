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
const EXCHANGE_API_URL = "https://api.apilayer11.com/exchangerates_data/";

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
          throw new Error();
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
      try {
        const timeseriesParameters = `start_date=2022-10-01&end_date=2022-11-03&base=${fromCurrencyCode}&symbols=${toCurrencyCode}`;
        const ratesResponse = await fetch(
          `${EXCHANGE_API_URL}timeseries?${timeseriesParameters}`,
          requestOptions
        );

        if (!ratesResponse.ok) {
          throw new Error(ratesResponse.statusText);
        }

        const ratesJSON: TimeSeriesResponse = await ratesResponse.json();

        if (!ratesJSON.success) {
          throw new Error();
        }

        return ratesJSON.rates;
      } catch (error) {
        // Better to automatically log to Sentry or similar solution
        // eslint-disable-next-line no-console -- TODO: Add the proper errors handling
        console.error(`Can't get exchange rates ${error}`);

        return new Error();
      }
    },
    []
  );

  return [currencyList, getExchangeRatesForCurrencies] as const;
};

export { useExchangeRate };
