import ReactDOM from "react-dom/client";
import { CurrencyExchangeApp } from "./CurrencyExchangeApp";
import "./index.pcss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<CurrencyExchangeApp />);
