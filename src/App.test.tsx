import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

// Component mock example
// const mockButton = vi.fn();
// vi.mock("./components/Button/Button", () => ({
//   Button: (props: ButtonProps) => {
//     mockButton(props);

//     return null;
//   },
// }));

render(<App />);

test("App loads and fires events", async () => {
  const button = screen.getByRole("button", { name: "count is 0" });
  expect(button).toBeInTheDocument();

  userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText("count is 1")).toBeInTheDocument();
  });
});
