import { format, intlFormat } from "date-fns";
import type { FC } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ExchangeRate {
  date: string;
  rate: number;
}

const CurrencyChart: FC<{ data: ExchangeRate[] }> = ({ data }) => (
  <LineChart width={400} height={400} data={data}>
    <CartesianGrid strokeDasharray="3" />
    <XAxis
      dataKey="date"
      tick={{ fontSize: 12 }}
      tickFormatter={(date) => format(new Date(date), "MM-dd")}
    />
    <YAxis
      type="number"
      domain={["dataMin", "dataMax"]}
      padding={{ top: 20, bottom: 20 }}
      tickFormatter={(value) => value.toFixed(2)}
      tick={{ fontSize: 12 }}
    />
    <Tooltip
      labelFormatter={(date: string) =>
        intlFormat(new Date(date), {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      }
      formatter={(value: number) => [parseFloat(value.toFixed(2)), "Rate"]}
    />
    <Line type="monotone" dataKey="rate" stroke="#8884d8" />
  </LineChart>
);

export { CurrencyChart };
