export const randomArr = (minLen: number = 3, maxLen: number = 17,): Array<number> => {
	const result = [];
	const length = Math.floor(Math.random() * (maxLen - minLen) + minLen);
	for (let i = 0; i < length; i++) {
		result.push(Math.floor(Math.random() * 100));
	}
	return result;
}