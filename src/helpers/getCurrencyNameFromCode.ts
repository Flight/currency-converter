import type { CurrencyName } from "../typings/CurrencyName";

/**
 * @example
 * getCurrencyNameFromCode("EUR", ["EUR": "Euro", USD: "US Dollar"]) // "US Dollar"
 * @param code Currecy code
 * @param currencyList Array of currencies
 * @returns Currency name {string} or {undefined}
 */
const getCurrencyNameFromCode = (
  code: string,
  currencyList: CurrencyName[]
): string | undefined => {
  if (!currencyList || currencyList instanceof Error) {
    return undefined;
  }

  return currencyList.find((currency) => currency.code === code)?.name;
};

export { getCurrencyNameFromCode };
