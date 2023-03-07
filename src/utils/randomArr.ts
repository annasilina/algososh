import {ElementStates} from "../types/element-states";
import {TItem} from "../types/TItem";

export const randomArr = (minLen: number = 3, maxLen: number = 17, ): Array<TItem> => {
	const result = [];
	const length = Math.floor(Math.random() * (maxLen - minLen) + minLen);
	for (let i = 0; i < length; i++) {
		result.push({
			value: Math.floor(Math.random() * 100),
			state: ElementStates.Default
		});
	}
	return result;
}