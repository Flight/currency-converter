import type { Meta, StoryObj } from "@storybook/react";
import { CurrencySelector as CurrencySelectorComponent } from "../components/CurrencySelector/CurrencySelector";
import type { CurrencySelectorProps } from "../components/CurrencySelector/CurrencySelector";

const meta: Meta<typeof CurrencySelector> = {
  title: "Components/Currency Selector",
  component: CurrencySelectorComponent,
};

export default meta;
type Story = StoryObj<typeof CurrencySelectorComponent>;

export const CurrencySelector: Story = {
  args: {
    className: "ma-10",
    id: "currency",
    label: "Please select the currency",
    value: undefined,
    currencyList: [
      {
        code: "AED",
        name: "United Arab Emirates Dirham",
      },
      {
        code: "AFN",
        name: "Afghan Afghani",
      },
      {
        code: "ALL",
        name: "Albanian Lek",
      },
    ],
    onChange: (event) => alert(`New value: ${event.target.value}`),
  },
  render: (args: CurrencySelectorProps) => (
    <CurrencySelectorComponent {...args} />
  ),
};
