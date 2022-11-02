import { render, screen } from "@testing-library/react";
import { App } from "./App";

const mockConverter = vi.fn();
vi.mock("./components/Converter/Converter", () => ({
  Converter: () => mockConverter(),
}));

render(<App />);

test("App loads and fires events", async () => {
  expect(
    screen.getByRole("heading", { name: "Currency exchange" })
  ).toBeInTheDocument();
  expect(mockConverter).toHaveBeenCalledTimes(1);
});
