import type { FC } from "react";
import { Converter } from "./components/Converter/Converter";

const App: FC = () => (
  <div className="mx-auto max-w-xs my-5">
    <h1 className="text-xl font-bold my-5">Currency exchange</h1>
    <Converter />
  </div>
);

export { App };
