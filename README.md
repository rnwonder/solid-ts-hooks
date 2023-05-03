<div align="center">
<h1>Solid-ts-hooks</h1>
<div>Solidjs hook library, ready to use, written in Typescript.</div>
<br />
</div>

<br />
  <pre>npm i <a href="https://www.npmjs.com/package/solid-ts-hooks">solid-ts-hooks</a></pre>
  <pre>yarn add <a href="https://www.npmjs.com/package/solid-ts-hooks">solid-ts-hooks</a></pre>
  <pre>pnpm add <a href="https://www.npmjs.com/package/solid-ts-hooks">solid-ts-hooks</a></pre>
  <br />

<div align="center">
  <sub>Created by <a href="https://github.com/rnwonder">Rnwonder</a>. inspired by <a href="https://github.com/juliencrn/usehooks-ts">usehooks-ts</a>
</div>


###  Hook List
- createClickOutside
- createLocalStorage
- createDarkMode
- createIntersectingObserver
- createMap
- createMediaQuery
- createWindowScroll
- createWindowSize


### Usage

createClickOutside
```js
import { createClickOutside} from "solid-ts-hooks";

const setRef = createClickOutside(() => {  
  console.log("click outside");  
});

return (
  <div ref={setRef}>Click outside me</div>
)
```

createLocalStorage

```js
import { createLocalStorage } from "solid-ts-hooks";

const  [data, setData]  =  useLocalStorage('some-data',  {})

setData({ name: "Paul" })

return (
  <div>Your name is {data()?.name}</div>
)
```
createDarkMode
```js
import { createDarkMode} from "solid-ts-hooks";

const { isDarkMode, enable, toggle, disable } = createDarkMode(true);

return (
  <div>Your mode is {isDarkMode() ? "Dark" : "Light"}</div>
)
```
createIntersectingObserver
```js
import { createIntersectingObserver} from "solid-ts-hooks";

const { setRef, isVisible } = createIntersectingObserver({});

return (
  <div ref={setRef}>I am {isVisible() ? "visible" : "invisible"}</div>
)
```
createMap
```js
import { createMap} from "solid-ts-hooks";

const  [map, actions]  =  createMap<string,  string>(initialValues)
    const  set  =  ()  => actions.set(String(Date.now()),  '📦')
	const  setAll  =  ()  => actions.setAll(otherValues)
	const  reset  =  ()  => actions.reset()
	const  remove  =  ()  => actions.remove('hello')

return (
  <div ref={setRef}>
	<button  onClick={set}>Add</button>
	<button  onClick={reset}>Reset</button>
	<button  onClick={setAll}>Set new data</button>
	<button  onClick={remove}  disabled={!map.get('hello')}>
		{'Remove "hello"'}
	</button>
</div>
)
```

createMediaQuery
```js
import { createMediaQuery } from "solid-ts-hooks";

const matches =  createMediaQuery ('(min-width: 768px)')

return (
  <div>{`The view port is ${matches ?  'at least'  :  'less than'} 768 pixels wide`}</div>
)
```
createWindowScroll
```js
import { createWindowScroll} from "solid-ts-hooks";

createWindowScroll(() => {
 console.log("scroll")
})
```

createWindowSize
```js
import { createWindowSize} from "solid-ts-hooks";

const { width, height} =  createWindowSize()

console.log(width(), height())

```


<a href="https://www.buymeacoffee.com/rnwonderw" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="40px" width="170px"></a>
