import { createEffect, createSignal, onCleanup } from "solid-js";

export const createIntersectingObserver = ({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = false,
}) => {
  const [ref, setRef] = createSignal<HTMLElement>();
  const [entry, setEntry] = createSignal<IntersectionObserverEntry>();
  const [isVisible, setIsVisible] = createSignal(false);
  const frozen = entry()?.isIntersecting && freezeOnceVisible;
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  createEffect(() => {
    const node = ref(); // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    onCleanup(() => {
      observer.disconnect();
    });
  });

  createEffect(() => {
    setIsVisible(!!entry()?.isIntersecting)
  });

  return { setRef, entry, isVisible };
};
