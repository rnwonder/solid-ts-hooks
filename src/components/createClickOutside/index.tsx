import { createEffect, createSignal, onCleanup } from "solid-js";

interface IClickOutsideProps {
  fn: () => void;
  options: {
    ignoreEscape?: boolean;
  };
}

interface IClickOutsideOptions {
  callOnEscapeButtonClick?: boolean;
  callOnTabButtonClick?: boolean;
  callOnEnterButtonClick?: boolean;
}

export const createClickOutside = (
  fn: () => void,
  options?: IClickOutsideOptions
) => {
  const [ref, setRef] = createSignal<HTMLElement>();

  const handleClickOutside = (event: MouseEvent) => {
    if (ref() && !ref()?.contains(event.target as Node)) {
      fn();
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (!options?.callOnEscapeButtonClick) return;
    if (event.key === "Escape") {
      fn();
    }
  };

  const handleTab = (event: KeyboardEvent) => {
    if (!options?.callOnTabButtonClick) return;
    if (event.key === "Tab") {
      fn();
    }
  };

  const handleEnter = (event: KeyboardEvent) => {
    if (!options?.callOnEnterButtonClick) return;
    if (event.key === "Enter") {
      fn();
    }
  };

  createEffect(() => {
    // document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.addEventListener("keydown", handleTab);
    document.addEventListener("keydown", handleEnter);

    onCleanup(() => {
      // document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("keydown", handleTab);
      document.removeEventListener("keydown", handleEnter);
    });
  });

  return setRef;
};
