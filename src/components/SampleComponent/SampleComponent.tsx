import type { ChangeEvent } from "react";
import { useState } from "react";

const SampleComponent = () => {
  const [input1Value, setInput1Value] = useState("0");

  const onInput1Change = (event: ChangeEvent<HTMLInputElement>) => {
    setInput1Value(event.target.value);
  };

  return (
    <div>
      SampleComponent
      <div>Input value: {input1Value}</div>
      <input value={input1Value} onChange={onInput1Change} pattern="" />
    </div>
  );
};

export { SampleComponent };
