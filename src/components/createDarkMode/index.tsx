import { createMediaQuery } from "../createMediaQuery";
import { createLocalStorage } from "../createLocalStorage";
import { createEffect, createSignal } from "solid-js";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";
export const createDarkMode = (defaultValue?: boolean) => {
  const isDarkOS = createMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = createLocalStorage<boolean>(
    "solid-wonder-ui-hooks-dark-mode",
    defaultValue ?? isDarkOS() ?? false
  );
  const [hasMounted, setHasMounted] = createSignal(false);

  // Update darkMode if os prefers changes
  createEffect(() => {
    if (!hasMounted()) return;
    if (isDarkOS === undefined) return;
    console.log("update", isDarkOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return {
    isDarkMode,
    toggle: () => setDarkMode(!isDarkMode()),
    enable: () => setDarkMode(true),
    disable: () => setDarkMode(false),
  };
};
