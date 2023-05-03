import {Accessor} from "solid-js";

declare global {
    interface WindowEventMap {
        "local-storage": CustomEvent;
    }
}

export type SetLocalStorageValue<T> = (value: T) => void;

export interface WindowSize {
    width: Accessor<number>;
    height: Accessor<number>;
}
