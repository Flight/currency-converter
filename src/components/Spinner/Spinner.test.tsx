import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

test("Renders spinner without title", () => {
  render(<Spinner />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("Renders spinner with title", () => {
  render(<Spinner title="Loading memes" />);

  expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  expect(screen.getByText("Loading memes")).toBeInTheDocument();
});
