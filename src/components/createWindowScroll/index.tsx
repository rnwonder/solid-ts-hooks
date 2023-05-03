import { createEffect, onCleanup } from "solid-js";

export const createWindowScroll = (fn: () => void) => {
  createEffect(() => {
    document.addEventListener("scroll", fn);
    onCleanup(() => {
      document.removeEventListener("scroll", fn);
    });
  });
};
