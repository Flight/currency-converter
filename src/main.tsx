import React from "react";
import ReactDOM from "react-dom/client";
import { CurrencyExchangeApp } from "./CurrencyExchangeApp";
import "./index.pcss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CurrencyExchangeApp />
  </React.StrictMode>
);
