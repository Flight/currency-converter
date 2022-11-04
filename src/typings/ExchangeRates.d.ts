interface CurrencyName {
  code: string;
  name: string;
}

interface SymbolsNames {
  [currencyCode: string]: string;
}

interface SymbolsResponse {
  success: boolean;
  symbols: SymbolsNames;
}
interface ExchangeRateResponse {
  [currencyCode: string]: number;
}
interface ExchangeRatesResponse {
  [date: string]: ExchangeRateResponse;
}

interface ExchangeRates {
  [date: string]: number;
}

interface TimeseriesResponse {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: ExchangeRatesResponse;
}

export type {
  CurrencyName,
  SymbolsNames,
  SymbolsResponse,
  ExchangeRateResponse,
  ExchangeRatesResponse,
  ExchangeRates,
  TimeseriesResponse,
};
