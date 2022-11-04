import { format } from "date-fns";
import type { ChangeEvent, FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { useExchangeRate } from "../../hooks/useExchangeRate";
import type { ExchangeRates } from "../../typings/ExchangeRates";
import { CurrencyChart } from "../CurrencyChart/CurrencyChart";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import { ReactComponent as IconSwap } from "../../svg/swap.svg";
import { Spinner } from "../Spinner/Spinner";

const Converter: FC = () => {
  const [currencyList, getExchangeRatesForCurrencies] = useExchangeRate();

  const [fromValue, setFromValue] = useState("100");
  const [toValue, setToValue] = useState<string>();

  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();

  const todayDate = format(new Date(), "yyyy-MM-dd");

  const getCurrencyNameFromCode = useCallback(
    (code: string): string | undefined => {
      if (!currencyList || currencyList instanceof Error) {
        return undefined;
      }

      return currencyList.find((currency) => currency.code === code)?.name;
    },
    [currencyList]
  );

  useEffect(() => {
    setToValue(undefined);

    if (!fromValue || !exchangeRates || !fromCurrency || !toCurrency) {
      return;
    }

    const exchangeRate = exchangeRates?.[todayDate];
    if (!exchangeRate) {
      return;
    }

    setToValue(
      (parseFloat(parseFloat(fromValue).toFixed(2)) * exchangeRate).toString()
    );
  }, [exchangeRates, fromValue, fromCurrency, toCurrency, todayDate]);

  useEffect(() => {
    setExchangeRates(undefined);

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

  const swapCurrencies = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }, [fromCurrency, toCurrency]);

  return (
    <div className="card shadow-2xl bg-base-100">
      <div className="card-body">
        {currencyList === undefined ? (
          <Spinner
            title="Loading available currencies"
            className="text-center"
          />
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {currencyList instanceof Error ? (
              <p className="text-neutral text-center">
                Something went wrong, please try again later.
              </p>
            ) : (
              <>
                <div className="md:flex gap-5">
                  <div className="md:w-1/3">
                    <div className="form-control">
                      <label className="label" htmlFor="fromValue">
                        <span className="label-text">Enter amount</span>
                      </label>
                      <input
                        value={fromValue}
                        id="fromValue"
                        className="appearance-none input input-bordered"
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          setFromValue(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <CurrencySelector
                      id="fromSelect"
                      label="From"
                      value={fromCurrency}
                      currencyList={currencyList}
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        setFromCurrency(event.target.value);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <div className="form-control mt-2 md:mt-0">
                      <label className="label hidden md:flex">
                        <span className="label-text invisible">&nbsp;</span>
                      </label>
                      <button
                        type="button"
                        className="btn my-2 md:my-0"
                        onClick={swapCurrencies}
                        title="Swap currencies"
                      >
                        <IconSwap className="w-5 h-5" title="Swap currencies" />
                      </button>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <CurrencySelector
                      id="toSelect"
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
                  <div className="mt-5 text-center">
                    <strong>{parseFloat(fromValue).toFixed(2)}</strong>{" "}
                    {getCurrencyNameFromCode(fromCurrency)} =
                    <br />
                    {toValue ? (
                      <strong
                        className={`text-xl ${toValue ? "text-accent" : ""}`}
                      >
                        {parseFloat(toValue).toFixed(2)}{" "}
                        {getCurrencyNameFromCode(toCurrency)}
                      </strong>
                    ) : (
                      <Spinner
                        title="Loading exchange rates"
                        className="mt-2"
                      />
                    )}
                  </div>
                )}
                {exchangeRates && fromCurrency && toCurrency && (
                  <CurrencyChart
                    data={Object.entries(exchangeRates).map(([key, value]) => ({
                      date: key,
                      rate: value,
                    }))}
                    className="mt-5"
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export { Converter };
