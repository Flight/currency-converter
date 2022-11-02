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

interface ExchangeRate {
  [currencyCode: string]: number;
}

interface ExchangeRates {
  [date: string]: Rates;
}

interface TimeSeriesResponse {
  success: boolean;
  timeseries: boolean;
  start_date: string;
  end_date: string;
  base: string;
  rates: ExchangeRates;
}

export type {
  CurrencyName,
  SymbolsResponse,
  SymbolsNames,
  ExchangeRate,
  ExchangeRates,
  TimeSeriesResponse,
};
