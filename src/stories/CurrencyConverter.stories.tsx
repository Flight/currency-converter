import type { Meta, StoryObj } from "@storybook/react";
import { CurrencyConverter as CurrencyConverterComponent } from "../components/CurrencyConverter/CurrencyConverter";
import type { CurrencyConverterProps } from "../components/CurrencyConverter/CurrencyConverter";

const meta: Meta<typeof CurrencyConverter> = {
  title: "Components/Currency Converter",
  component: CurrencyConverterComponent,
};

export default meta;
type Story = StoryObj<typeof CurrencyConverterComponent>;

export const CurrencyConverter: Story = {
  args: {
    currencyList: [
      { code: "USD", name: "United States Dollar" },
      { code: "EUR", name: "Euro" },
    ],
    fromValue: "100",
    toValue: "123",
    setFromValue: (value) => alert(`setFromValue ${value}`),
    fromCurrency: "USD",
    setFromCurrency: (value) => alert(`setFromCurrency ${value}`),
    toCurrency: "EUR",
    setToCurrency: (value) => alert(`setToCurrency ${value}`),
    swapCurrencies: () => alert("Swap currencies"),
    exchangeRatesByDate: { "2022-12-01": 1.2, "2022-12-02": 1.21 },
  },
  render: (args: CurrencyConverterProps) => (
    <CurrencyConverterComponent {...args} />
  ),
};
