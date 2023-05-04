import {reversString} from './reversString';

describe('reversString', () => {
	it('should be revers correctly with even count of symbols', async () => {
		const symbolsArray = await reversString('1234')
		expect(symbolsArray).toEqual(['4', '3', '2', '1']);
	});

	it('should be revers correctly with odd count of symbols', async () => {
		const symbolsArray = await reversString('123')
		expect(symbolsArray).toEqual(['3', '2', '1']);
	});

	it('should be revers correctly with one symbol', async () => {
		const symbolsArray = await reversString('1')
		expect(symbolsArray).toEqual(['1']);
	});

	it('should be revers correctly with empty string', async () => {
		const symbolsArray = await reversString('')
		expect(symbolsArray).toEqual([]);
	});
});