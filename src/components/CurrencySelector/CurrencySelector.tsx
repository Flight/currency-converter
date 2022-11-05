import type { ChangeEvent, FC } from "react";
import type { CurrencyName } from "../../typings/CurrencyName";

interface CurrencySelectorProps {
  id: string;
  label: string;
  currencyList: CurrencyName[];
  value: string | undefined;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

/**
 * Currency selector component
 * @example
 * <CurrencySelector
 *   id="currency"
 *   label="Please select the currency"
 *   value={selectedCurrency}
 *   currencyList={currencyList}
 *   onChange={(event) => console.log(event.target.value)}
 *   className="w-1/2" />
 * @param id Select id
 * @param label Select label
 * @param currencyList Array of currency names and codes
 * @param value Selected option value
 * @param onChange On select change event handler
 * @param className Optional class name
 * @returns React component
 */
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
export type { CurrencySelectorProps };
