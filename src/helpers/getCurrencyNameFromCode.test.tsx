import { getCurrencyNameFromCode } from "./getCurrencyNameFromCode";

const sampleCurrencyList = [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
];

test("Gets the currency name from code", () => {
  expect(getCurrencyNameFromCode("EUR", sampleCurrencyList)).toBe("Euro");
  expect(getCurrencyNameFromCode("USD", sampleCurrencyList)).toBe(
    "United States Dollar"
  );
  expect(getCurrencyNameFromCode("ASD", sampleCurrencyList)).toBe(undefined);
});
