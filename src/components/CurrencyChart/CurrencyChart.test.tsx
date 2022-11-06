import { render } from "@testing-library/react";
import { CurrencyChart } from "./CurrencyChart";

const mockLineChart = vi.fn();
vi.mock("recharts", () => ({
  ResponsiveContainer: vi.fn(({ children }) => children),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  LineChart: (props: any) => mockLineChart(props),
  CartesianGrid: () => {},
  XAxis: () => {},
  YAxis: () => {},
  Tooltip: () => {},
  Line: () => {},
}));

const sampleData = [
  { date: "2022-12-20", rate: 1.2 },
  { date: "2022-12-21", rate: 1.3 },
];

test("Passes the correct data to the currency chart", () => {
  render(<CurrencyChart data={sampleData} />);

  expect(mockLineChart).toBeCalledTimes(1);
  expect(mockLineChart).toBeCalledWith(
    expect.objectContaining({ data: sampleData })
  );
});
