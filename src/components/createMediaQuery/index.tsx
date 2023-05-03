import { Accessor, createEffect, createSignal, onCleanup } from "solid-js";

export function createMediaQuery(query: string): Accessor<boolean | undefined> {
  const getMatches = (query: string): boolean | undefined => {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return undefined;
  };

  const [matches, setMatches] = createSignal(
    getMatches(query)
  );

  function handleChange() {
    setMatches(getMatches(query));
  }

  createEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }

    onCleanup(() => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    });
  });

  return matches;
}

