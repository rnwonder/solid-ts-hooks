import type { Component } from "solid-js";
import { createEffect, createSignal } from "solid-js";
import { createDarkMode } from "./components/createDarkMode";
import { createWindowSize } from "./lib/index";
import { createClickOutside } from "./components/createClickOutside";
import { createIntersectingObserver } from "./components/createIntersectingObserver";

const App: Component = () => {
  const [vv, setVv] = createSignal("");
  const { isDarkMode, enable, toggle, disable } = createDarkMode(true);
  const { width, height } = createWindowSize();
  const setRef = createClickOutside(() => {
    console.log("click outside");
  });
  const { setRef: setFF, isVisible } = createIntersectingObserver({});

  createEffect(() => {
    console.log("update", width(), isVisible());
  });
  return (
    <div>
      <div
        ref={setRef}
        style={{
          width: "200px",
          height: "200px",
          "background-color": isDarkMode() ? "black" : "green",
        }}
      ></div>
      <input value={vv()} oninput={(e) => setVv(e.currentTarget.value)} />
      <button onClick={toggle}>Toggle</button>
      <button onClick={enable}>Enable</button>
      <button onClick={disable}>Disable</button>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br /> <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />



      <div
        ref={setFF}
        style={{
          width: "200px",
          height: "200px",
          "background-color": isDarkMode() ? "blue" : "pink",
        }}
      ></div>
    </div>
  );
};

export default App;
