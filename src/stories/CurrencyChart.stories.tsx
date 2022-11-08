import type { Meta, StoryObj } from "@storybook/react";
import { CurrencyChart as CurrencyChartComponent } from "../components/CurrencyChart/CurrencyChart";
import type { CurrencyChartProps } from "../components/CurrencyChart/CurrencyChart";

const meta: Meta<typeof CurrencyChart> = {
  title: "Components/Currency Chart",
  component: CurrencyChartComponent,
};

export default meta;
type Story = StoryObj<typeof CurrencyChartComponent>;

export const CurrencyChart: Story = {
  args: {
    data: [
      {
        date: "2022-10-08",
        rate: 24.035847,
      },
      {
        date: "2022-10-09",
        rate: 24.036365,
      },
      {
        date: "2022-10-10",
        rate: 23.685645,
      },
      {
        date: "2022-10-11",
        rate: 23.141225,
      },
      {
        date: "2022-10-12",
        rate: 23.277256,
      },
      {
        date: "2022-10-13",
        rate: 23.277131,
      },
      {
        date: "2022-10-14",
        rate: 23.55065,
      },
      {
        date: "2022-10-15",
        rate: 23.55065,
      },
      {
        date: "2022-10-16",
        rate: 23.548176,
      },
      {
        date: "2022-10-17",
        rate: 23.685701,
      },
      {
        date: "2022-10-18",
        rate: 23.82196,
      },
      {
        date: "2022-10-19",
        rate: 23.685758,
      },
      {
        date: "2022-10-20",
        rate: 23.413494,
      },
      {
        date: "2022-10-21",
        rate: 23.279029,
      },
      {
        date: "2022-10-22",
        rate: 23.482143,
      },
      {
        date: "2022-10-23",
        rate: 23.482777,
      },
      {
        date: "2022-10-24",
        rate: 23.27648,
      },
      {
        date: "2022-10-25",
        rate: 23.685633,
      },
      {
        date: "2022-10-26",
        rate: 23.685802,
      },
      {
        date: "2022-10-27",
        rate: 23.685763,
      },
      {
        date: "2022-10-28",
        rate: 23.958447,
      },
      {
        date: "2022-10-29",
        rate: 23.958447,
      },
      {
        date: "2022-10-30",
        rate: 23.958369,
      },
      {
        date: "2022-10-31",
        rate: 23.549731,
      },
      {
        date: "2022-11-01",
        rate: 23.957929,
      },
      {
        date: "2022-11-02",
        rate: 23.957917,
      },
      {
        date: "2022-11-03",
        rate: 24.094508,
      },
      {
        date: "2022-11-04",
        rate: 23.958447,
      },
      {
        date: "2022-11-05",
        rate: 23.58616,
      },
      {
        date: "2022-11-06",
        rate: 23.756879,
      },
      {
        date: "2022-11-07",
        rate: 23.82052,
      },
      {
        date: "2022-11-08",
        rate: 24.046865,
      },
    ],
    className: "ma-10",
  },
  render: (args: CurrencyChartProps) => <CurrencyChartComponent {...args} />,
};
