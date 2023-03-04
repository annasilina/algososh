export const swap = (arr: any[], firstIndex: number, secondIndex: number): any[] => {
	let tmp = arr[firstIndex];
	arr[firstIndex] = arr[secondIndex];
	arr[secondIndex] = tmp;
	return arr;
}