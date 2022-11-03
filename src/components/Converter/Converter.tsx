import { format } from "date-fns";
import type { ChangeEvent, FC } from "react";
import { useEffect, useState } from "react";
import { useExchangeRate } from "../../hooks/useExchangeRate";
import type { ExchangeRates } from "../../typings/ExchangeRates";
import { CurrencyChart } from "../CurrencyChart/CurrencyChart";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";

const Converter: FC = () => {
  const [currencyList, getExchangeRatesForCurrencies] = useExchangeRate();

  const [fromValue, setFromValue] = useState("100");
  const [toValue, setToValue] = useState<string>();

  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();

  const todayDate = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    setToValue(undefined);

    if (!fromValue || !exchangeRates || !fromCurrency || !toCurrency) {
      return;
    }

    const exchangeRate = exchangeRates?.[todayDate]?.[toCurrency];
    if (!exchangeRate) {
      return;
    }

    setToValue((parseFloat(fromValue) * exchangeRate).toFixed(2));
  }, [exchangeRates, fromValue, fromCurrency, toCurrency, todayDate]);

  useEffect(() => {
    if (!fromCurrency || !toCurrency) {
      return;
    }

    const getRates = async () => {
      setExchangeRates(
        await getExchangeRatesForCurrencies(fromCurrency, toCurrency)
      );
    };

    getRates();
  }, [fromCurrency, toCurrency, getExchangeRatesForCurrencies]);

  return currencyList === undefined ? (
    <>Loading</>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currencyList instanceof Error ? (
        <>Something went wrong, please try again later.</>
      ) : (
        <>
          <div className="flex flex-1">
            <div className="w-1/3">
              <label>
                Amount
                <br />
                <input
                  value={fromValue}
                  className="appearance-none w-full"
                  type="number"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    setFromValue(event.target.value);
                  }}
                />
              </label>
            </div>
            <div className="w-1/3">
              <CurrencySelector
                label="From"
                value={fromCurrency}
                currencyList={currencyList}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setFromCurrency(event.target.value);
                }}
                className="w-full"
              />
            </div>
            <div className="w-1/3">
              <CurrencySelector
                label="To"
                value={toCurrency}
                currencyList={currencyList}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  setToCurrency(event.target.value);
                }}
                className="w-full"
              />
            </div>
          </div>
          {fromValue && fromCurrency && toCurrency && (
            <div>
              {fromValue} {fromCurrency} =<br />
              <strong className="text-lg">
                {toValue ?? <>Loading...</>} {toCurrency}
              </strong>
            </div>
          )}
          {exchangeRates && fromCurrency && toCurrency && (
            <CurrencyChart
              data={Object.entries(exchangeRates).map(([key, value]) => ({
                date: key,
                rate: value[toCurrency],
              }))}
            />
          )}
        </>
      )}
    </>
  );
};

export { Converter };
