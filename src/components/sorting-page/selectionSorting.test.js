import {selectionSorting} from './selectionSorting';
import {Direction} from '../../types/direction';

describe('selectionSorting', () => {
	it('should be sorting correctly by selection an empty array', async () => {
		const sortedAsc = await selectionSorting([], Direction.Ascending);
		const sortedDesc = await selectionSorting([], Direction.Descending);
		expect(sortedAsc).toEqual([]);
		expect(sortedDesc).toEqual([]);
	});

	it('should be sorting correctly by selection an empty array', async () => {
		const sortedAsc = await selectionSorting([], Direction.Ascending);
		const sortedDesc = await selectionSorting([], Direction.Descending);
		expect(sortedAsc).toEqual([]);
		expect(sortedDesc).toEqual([]);
	});

	it('should be sorting correctly by selection an array with one element', async () => {
		const sortedAsc = await selectionSorting([1], Direction.Ascending);
		const sortedDesc = await selectionSorting([1], Direction.Descending);
		expect(sortedAsc).toEqual([1]);
		expect(sortedDesc).toEqual([1]);
	});

	it('should be sorting correctly by selection an array with some element', async () => {
		const sortedAsc = await selectionSorting([24, 5, 3, 10, 20, 0], Direction.Ascending);
		const sortedDesc = await selectionSorting([24, 5, 3, 10, 20, 0], Direction.Descending);

		expect(sortedAsc).toEqual([0, 3, 5, 10, 20, 24]);
		expect(sortedDesc).toEqual([24, 20, 10, 5, 3, 0]);
	});
})