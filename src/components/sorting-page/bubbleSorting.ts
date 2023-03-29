import {Direction} from "../../types/direction";
import React from "react";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const bubbleSorting = async (
	array: number[],
	direction: Direction,
	setArray?: (value: React.SetStateAction<number[]>) => void,
	setCurrentIndex?: (value: React.SetStateAction<number[]>) => void,
	setSortedIndex?: (value: React.SetStateAction<number[]>) => void,
	delay?: (ms: number) => Promise<unknown>
) => {
	let tmp;
	let statement;
	const sorted: number[] = [];

	for (let i = 0; i < array.length; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			if (delay) await delay(SHORT_DELAY_IN_MS);
			if (setCurrentIndex) setCurrentIndex([j, j + 1]);

			if (direction === Direction.Ascending) {
				statement = (array[j] > array[j + 1])
			}

			if (direction === Direction.Descending) {
				statement = (array[j] < array[j + 1])
			}

			if (statement) {
				tmp = array[j + 1];
				array[j + 1] = array[j];
				array[j] = tmp;
			}

		}
		sorted.push(array.length - i - 1)
		if (setSortedIndex) setSortedIndex(sorted);
	}

	return array;
}