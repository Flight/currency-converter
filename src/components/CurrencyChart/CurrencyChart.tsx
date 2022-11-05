import { format, intlFormat } from "date-fns";
import type { FC } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface CurrencyChartProps {
  data: { date: string; rate: number }[];
  className?: string;
}

/**
 * Component, which renders the chart for the currencies
 * @example
 * <CurrencyChart data={[date: "2022-12-20", rate: 1.2], [date: "2022-12-21", rate: 1.3]} className="ma-10" />
 * @param data An array of { date: string; rate: number } objects
 * @param className Optional className for the container
 * @returns React component
 */
const CurrencyChart: FC<CurrencyChartProps> = ({ data, className = "" }) => (
  <ResponsiveContainer width="100%" height={200} className={className}>
    <LineChart data={data}>
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
      <Line type="monotone" dataKey="rate" stroke="#37cdbe" strokeWidth={3} />
    </LineChart>
  </ResponsiveContainer>
);

export { CurrencyChart };
export type { CurrencyChartProps };
