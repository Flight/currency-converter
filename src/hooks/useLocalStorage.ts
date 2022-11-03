import { useCallback, useState } from "react";

const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState(localStorage.getItem(key));

  const setValue = useCallback(
    (value: string | null) => {
      setStoredValue(value);
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    },
    [key]
  );

  return [storedValue, setValue] as const;
};

export { useLocalStorage };
