import { format } from "date-fns";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { useExchangeRate } from "../../hooks/useExchangeRate";
import type { ExchangeRatesByDate } from "../../typings/ExchangeRatesByDate";
import { CurrencyConverter } from "./CurrencyConverter";

const CurrencyConverterApp: FC = () => {
  const [currencyList, getExchangeRatesForCurrencies] = useExchangeRate();

  const [fromValue, setFromValue] = useState("100");
  const [toValue, setToValue] = useState<string>();

  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();

  const [exchangeRatesByDate, setExchangeRatesByDate] =
    useState<ExchangeRatesByDate>();

  const todayDateString = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    setToValue(undefined);

    if (!fromValue || !exchangeRatesByDate || !fromCurrency || !toCurrency) {
      return;
    }

    const exchangeRate = exchangeRatesByDate?.[todayDateString];
    if (!exchangeRate) {
      return;
    }

    setToValue(
      (parseFloat(parseFloat(fromValue).toFixed(2)) * exchangeRate).toString()
    );
  }, [
    exchangeRatesByDate,
    fromValue,
    fromCurrency,
    toCurrency,
    todayDateString,
  ]);

  useEffect(() => {
    setExchangeRatesByDate(undefined);

    if (!fromCurrency || !toCurrency) {
      return;
    }

    const getRates = async () => {
      setExchangeRatesByDate(
        await getExchangeRatesForCurrencies(fromCurrency, toCurrency)
      );
    };

    getRates();
  }, [fromCurrency, toCurrency, getExchangeRatesForCurrencies]);

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <CurrencyConverter
      currencyList={currencyList}
      fromValue={fromValue}
      toValue={toValue}
      setFromValue={setFromValue}
      fromCurrency={fromCurrency}
      setFromCurrency={setFromCurrency}
      toCurrency={toCurrency}
      setToCurrency={setToCurrency}
      swapCurrencies={swapCurrencies}
      exchangeRatesByDate={exchangeRatesByDate}
    />
  );
};

export { CurrencyConverterApp };
