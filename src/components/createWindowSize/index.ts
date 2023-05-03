import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
} from "solid-js";
import { WindowSize } from "../../lib/types";

export const createWindowSize = (): WindowSize => {
  const [width, setWidth] = createSignal(0);
  const [height, setHeight] = createSignal(0);
  const handleSize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  onMount(() => {
    handleSize();
  });

  createEffect(() => {
    window.addEventListener("resize", handleSize);
    onCleanup(() => {
      window.removeEventListener("resize", handleSize);
    });
  });

  return { width, height };
};
