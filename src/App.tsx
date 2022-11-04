import type { FC } from "react";
import { Converter } from "./components/Converter/Converter";

const App: FC = () => (
  <div className="container mx-auto max-w-5xl p-5">
    <h1 className="text-3xl font-bold pb-5 text-center text-neutral">
      Currency exchange
    </h1>
    <Converter />
  </div>
);

export { App };
