import {delay} from "../../utils/delay";
import {DELAY_IN_MS} from "../../constants/delays";
import {swap} from "../../utils/swap";
import React from "react";

export const reversString = async (
	originalString: string,
	setNextIndexes?: React.Dispatch<React.SetStateAction<number[]>>,
	setArrFromString?: React.Dispatch<React.SetStateAction<string[]>>,
	setSortedIndexes?: React.Dispatch<React.SetStateAction<number[]>>
) => {
	let reversedArr = originalString.split('');
	let sorted: number[] = [];
	let start = 0;
	let end = reversedArr.length - 1;
	while (start <= end) {
		if (setNextIndexes) setNextIndexes([start, end]);
		await delay(DELAY_IN_MS);
		swap(reversedArr, start, end);
		if (setArrFromString) setArrFromString(reversedArr);
		sorted.push(start, end);
		if (setSortedIndexes) setSortedIndexes(sorted);
		start++;
		end--;
	}

	return reversedArr;
}