import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useLocalStorage } from "./useLocalStorage";

const mockGetItem = vi.fn(() => "initial state");
const mockSetItem = vi.fn();
const mockRemoveItem = vi.fn();

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: mockGetItem,
      setItem: mockSetItem,
      removeItem: mockRemoveItem,
    },
  });
});

test("Calls the local storage and returns correct values", () => {
  const { result } = renderHook(() => useLocalStorage("sample-key"));
  let [value, setter] = result.current;

  expect(mockGetItem).toBeCalledTimes(1);
  expect(value).toBe("initial state");

  act(() => {
    setter("test value");
  });
  expect(mockSetItem).toBeCalledTimes(1);
  expect(mockSetItem).toBeCalledWith("sample-key", "test value");

  [value, setter] = result.current;
  expect(value).toBe("test value");

  act(() => {
    setter(null);
  });
  expect(mockRemoveItem).toBeCalledTimes(1);
  expect(mockRemoveItem).toBeCalledWith("sample-key");
});
