export const fibCalculate = (value: number): number[] => {
	let result: number[] = [0, 1];
	for (let i = 2; i < value + 1; i++) {
		result.push(result[i - 2] + result[i - 1]);
	}
	return result;
}