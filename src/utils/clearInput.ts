export const clearInput = (id: string, setState?: (value: string) => void): void => {
	if (setState) {
		setState('');
	}
	const input = document.getElementById(id) as HTMLInputElement;
	input.value = '';
}