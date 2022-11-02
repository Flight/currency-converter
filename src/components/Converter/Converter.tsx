import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import { useExchangeRate } from "../../hooks/useExchangeRate";
import type { ExchangeRates } from "../../typings/ExchangeRates";

const Converter = () => {
  const [currencyList, getExchangeRatesForCurrencies] = useExchangeRate();

  const [fromValue, setFromValue] = useState("100");
  const [toValue, setToValue] = useState<string>();

  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<string>();

  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();

  useEffect(() => {
    if (!fromValue || !exchangeRates || !toCurrency) {
      return;
    }

    const exchangeRate = exchangeRates?.["2022-11-03"]?.[toCurrency];
    if (!exchangeRate) {
      return;
    }

    setToValue(
      (parseFloat(fromValue) * exchangeRates["2022-11-03"][toCurrency]).toFixed(
        2
      )
    );
  }, [exchangeRates, fromValue, toCurrency]);

  useEffect(() => {
    setToValue(undefined);
    console.log(`fromCurrency: ${fromCurrency}, toCurrency: ${toCurrency}`);

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
              <label>
                From
                <select
                  value={fromCurrency}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setFromCurrency(event.target.value);
                  }}
                  className="w-full"
                >
                  <option value={undefined}>Please select</option>
                  {currencyList.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="w-1/3">
              <label>
                To
                <select
                  value={toCurrency}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                    setToCurrency(event.target.value);
                  }}
                  className="w-full"
                >
                  <option value={undefined}>Please select</option>
                  {currencyList.map(({ code, name }) => (
                    <option key={code} value={code}>
                      {code} - {name}
                    </option>
                  ))}
                </select>
              </label>
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
        </>
      )}
    </>
  );
};

export { Converter };
