import { Accessor, createSignal, onMount } from "solid-js";
import { SetLocalStorageValue } from "../../lib/types";

declare global {
  interface WindowEventMap {
    "local-storage": CustomEvent;
  }
}

export function createLocalStorage<T>(
  key: string,
  initialValue: T
): [Accessor<T>, SetLocalStorageValue<T>] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const value = readValue();

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = createSignal(value);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.

  const setValue: SetLocalStorageValue<T> = (value) => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window === "undefined") {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));

      // Save state
      // @ts-ignore
      setStoredValue(value);

      // We dispatch a custom event so every useLocalStorage hook are notified
      window.dispatchEvent(new Event("local-storage"));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  const handleStorageChange = (event: StorageEvent | CustomEvent) => {
    if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) {
      return;
    }
    setStoredValue(readValue);
  };

  onMount(() => {
    setValue(value);
  });

  // this only works for other documents, not the current one
  window.addEventListener("storage", handleStorageChange);

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  window.addEventListener("local-storage", handleStorageChange);

  return [storedValue, setValue];
}


// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === "undefined" ? undefined : JSON.parse(value ?? "");
  } catch {
    console.log("parsing error on", { value });
    return undefined;
  }
}
