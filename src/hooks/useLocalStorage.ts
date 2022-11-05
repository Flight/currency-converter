import { useCallback, useState } from "react";

/**
 ** This hook gives an access to the localStorage
 * @example
 * const [userId, setUserId] = useLocalStorage("user-id");
 * console.log(userId); // Prints the current user ID from the local storage
 * setUserId("New user ID"); // Saves the new user ID to the local storage
 * @param key localStorage key
 * @returns [storedValue, setValue] - the current state {string} and the setter function {(value: string | null) => void}
 */
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
