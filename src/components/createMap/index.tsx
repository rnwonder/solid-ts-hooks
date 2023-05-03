import { createSignal } from "solid-js";

export type MapOrEntries<K, V> = Map<K, V> | [K, V][];
export interface Actions<K, V> {
  set: (key: K, value: V) => void;
  setAll: (entries: MapOrEntries<K, V>) => void;
  remove: (key: K) => void;
  reset: Map<K, V>["clear"];
}

// We hide some setters from the returned map to disable autocompletion
type Return<K, V> = [
  Omit<Map<K, V>, "set" | "clear" | "delete">,
  Actions<K, V>
];

export function createMap<K, V>(initialState: MapOrEntries<K, V> = new Map()) {
  const [map, setMap] = createSignal(new Map(initialState));
  const actions: Actions<K, V> = {
    set: (key, value) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.set(key, value);
        return copy;
      });
    },

    setAll: (entries) => {
      setMap(() => new Map(entries));
    },

    remove: (key) => {
      setMap((prev) => {
        const copy = new Map(prev);
        copy.delete(key);
        return copy;
      });
    },

    reset: () => {
      setMap(() => new Map());
    },
  };

  return [map, actions];
}
