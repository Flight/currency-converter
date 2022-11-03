import type { ChangeEvent, FC } from "react";
import type { CurrencyName } from "../../typings/ExchangeRates";

interface CurrencySelectorProps {
  label: string;
  currencyList: CurrencyName[];
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({
  label,
  currencyList,
  value,
  onChange,
  className = "",
}) => (
  <label>
    {label}
    <select value={value} onChange={onChange} className={className}>
      <option value="">Please select</option>
      {currencyList.map(({ code, name }) => (
        <option key={code} value={code}>
          {code} - {name}
        </option>
      ))}
    </select>
  </label>
);

export { CurrencySelector };
