import {swap} from "./swap";

export const selectionSort = (arr: Array<any>, type: string): Array<any> => {
	const {length} = arr;
	if (type === 'asc') {
		for (let i = 0; i < length; i++) {
			let maxInd = i;
			for (let j = 0; j < length; j++) {
				if (arr[maxInd] < arr[j]) {
					swap(arr, j, maxInd)
				}
			}
		}
	}

	if (type === 'desc') {
		for (let i = 0; i < length; i++) {
			let minInd = i;
			for (let j = 0; j < length; j++) {
				if (arr[minInd] > arr[j]) {
					swap(arr, minInd, j)
				}
			}
		}
	}

	return arr;
}