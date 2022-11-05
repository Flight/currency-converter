import type { Dispatch, FC, SetStateAction } from "react";
import { CurrencyChart } from "../CurrencyChart/CurrencyChart";
import { CurrencySelector } from "../CurrencySelector/CurrencySelector";
import { Spinner } from "../Spinner/Spinner";
import { ReactComponent as IconSwap } from "../../svg/swap.svg";
import { getCurrencyNameFromCode } from "../../helpers/getCurrencyNameFromCode";
import type { CurrencyName } from "../../typings/CurrencyName";
import type { ExchangeRatesByDate } from "../../typings/ExchangeRatesByDate";

interface CurrencyConverterProps {
  currencyList: CurrencyName[] | Error | undefined;

  fromValue: string | undefined;
  toValue: string | undefined;
  setFromValue: Dispatch<SetStateAction<string>>;

  fromCurrency: string | undefined;
  setFromCurrency: (value: string | undefined) => void;
  toCurrency: string | undefined;
  setToCurrency: (value: string | undefined) => void;

  swapCurrencies: () => void;

  exchangeRatesByDate: ExchangeRatesByDate | undefined;
}

const CurrencyConverter: FC<CurrencyConverterProps> = ({
  currencyList,

  fromValue,
  toValue,
  setFromValue,

  fromCurrency,
  setFromCurrency,
  toCurrency,
  setToCurrency,

  swapCurrencies,

  exchangeRatesByDate,
}) => (
  <div className="card shadow-2xl bg-base-100">
    <div className="card-body">
      {currencyList === undefined ? (
        <Spinner title="Loading available currencies" className="text-center" />
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
                      onChange={(event) => setFromValue(event.target.value)}
                    />
                  </div>
                </div>
                <div className="md:w-1/3">
                  <CurrencySelector
                    id="fromSelect"
                    label="From"
                    value={fromCurrency}
                    currencyList={currencyList}
                    onChange={(event) => setFromCurrency(event.target.value)}
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
                      <IconSwap
                        className="w-5 h-5 md:rotate-90"
                        title="Swap currencies"
                      />
                    </button>
                  </div>
                </div>
                <div className="md:w-1/3">
                  <CurrencySelector
                    id="toSelect"
                    label="To"
                    value={toCurrency}
                    currencyList={currencyList}
                    onChange={(event) => setToCurrency(event.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              {fromValue && fromCurrency && toCurrency && (
                <div className="mt-5 text-center">
                  <strong>{parseFloat(fromValue).toFixed(2)}</strong>{" "}
                  {getCurrencyNameFromCode(fromCurrency, currencyList)} =
                  <br />
                  {toValue ? (
                    <strong
                      className={`text-xl ${toValue ? "text-accent" : ""}`}
                    >
                      {parseFloat(toValue).toFixed(2)}{" "}
                      {getCurrencyNameFromCode(toCurrency, currencyList)}
                    </strong>
                  ) : (
                    <Spinner title="Loading exchange rates" className="mt-2" />
                  )}
                </div>
              )}
              {exchangeRatesByDate && fromCurrency && toCurrency && (
                <CurrencyChart
                  data={Object.entries(exchangeRatesByDate).map(
                    ([key, value]) => ({
                      date: key,
                      rate: value,
                    })
                  )}
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

export { CurrencyConverter };
export type { CurrencyConverterProps };
