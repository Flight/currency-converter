import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { SampleComponent } from "./components/SampleComponent/SampleComponent";

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto max-w-xs my-5">
      <div className="flex justify-center gap-4">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} alt="React logo" />
        </a>
      </div>
      <h1 className="text-lg text-center my-3 font-bold">Vite + React</h1>
      <div>
        <button
          onClick={() => setCount((oldCount) => oldCount + 1)}
          type="button"
          className="border-2 border-solid rounded px-2 py-1"
        >
          count is {count}
        </button>
        <p className="mt-2">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>Click on the Vite and React logos to learn more</p>

      <SampleComponent />
    </div>
  );
};

export { App };
