import {ElementStates} from "./element-states";

export type TItem<T> = {
	value: T;
	state: ElementStates;
}