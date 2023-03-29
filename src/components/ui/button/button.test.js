import React from 'react';
import renderer from 'react-test-renderer';

import {Button} from './button';

describe('button', () => {
	it('with text "Button" rendered correctly', () => {
		const element = renderer
			.create(<Button text='Button'/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('without text rendered correctly', () => {
		const element = renderer
			.create(<Button/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('disabled rendered correctly', () => {
		const element = renderer
			.create(<Button disabled={true}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('with loader rendered correctly', () => {
		const element = renderer
			.create(<Button isLoader={true}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});
});