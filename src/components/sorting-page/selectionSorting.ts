import {Direction} from "../../types/direction";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import React from "react";

export const selectionSorting = async (
	array: number[],
	direction: Direction,
	setArray?: (value: React.SetStateAction<number[]>) => void,
	setCurrentIndex?: (value: React.SetStateAction<number[]>) => void,
	setSortedIndex?: (value: React.SetStateAction<number[]>) => void,
	delay?: (ms: number) => Promise<unknown>
) => {
	let tmp;
	let statement;
	const sorted: Array<number> = [];

	for (let i = 0; i < array.length; i++) {
		let compareInd = i;
		for (let j = i + 1; j < array.length; j++) {
			if (setCurrentIndex) setCurrentIndex([i, j]);
			if (delay) await delay(SHORT_DELAY_IN_MS)

			direction === Direction.Ascending
				? statement = (array[compareInd] > array[j])
				: statement = (array[compareInd] < array[j])

			if (statement) {
				tmp = array[compareInd];
				array[compareInd] = array[j];
				array[j] = tmp;
			}
		}
		sorted.push(i);
		if (setSortedIndex) setSortedIndex(sorted);
	}

	return array;
}