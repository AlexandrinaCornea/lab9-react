import { useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (newValue) => {
    try {
      setStoredValue((currentValue) => {
        const valueToStore =
          typeof newValue === "function" ? newValue(currentValue) : newValue;

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch {
      // erori
    }
  };

  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      window.localStorage.removeItem(key);
    } catch {
      // erori
    }
  };

  return [storedValue, setValue, removeValue];
}
