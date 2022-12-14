import type { FC } from "react";
import { CurrencyConverterApp } from "./components/CurrencyConverter/CurrencyConverterApp";

/**
 * Currency Exchange App Component
 * @returns React component
 * @example <CurrencyExchangeApp />
 */
const CurrencyExchangeApp: FC = () => (
  <div className="container mx-auto max-w-5xl p-5">
    <h1 className="text-3xl font-bold pb-5 text-center text-neutral">
      Currency exchange
    </h1>
    <CurrencyConverterApp />
  </div>
);

export { CurrencyExchangeApp };
