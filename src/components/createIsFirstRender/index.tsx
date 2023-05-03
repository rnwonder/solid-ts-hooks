import { createSignal, onMount } from "solid-js";

const createIsFirstRender = () => {
  const [isFirstRender, setIsFirstRender] = createSignal(true);
  const [renderState, setRenderState] = createSignal(false);
  onMount(() => {
    if (isFirstRender()) {
      setIsFirstRender(false);
    }
  });



  return isFirstRender;
};

export default createIsFirstRender;
