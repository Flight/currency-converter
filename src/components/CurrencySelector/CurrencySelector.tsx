import type { ChangeEvent, FC } from "react";
import type { CurrencyName } from "../../typings/ExchangeRates";

interface CurrencySelectorProps {
  id: string;
  label: string;
  currencyList: CurrencyName[];
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({
  id,
  label,
  currencyList,
  value,
  onChange,
  className = "",
}) => (
  <div className="form-control">
    <label className="label" htmlFor={id}>
      <span className="label-text">{label}</span>
    </label>
    <select
      value={value}
      onChange={onChange}
      id={id}
      className={`select select-bordered ${className}`}
    >
      <option value="">Please select</option>
      {currencyList.map(({ code, name }) => (
        <option key={code} value={code}>
          {code} - {name}
        </option>
      ))}
    </select>
  </div>
);

export { CurrencySelector };
