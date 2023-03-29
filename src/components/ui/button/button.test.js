import React from 'react';
import renderer from 'react-test-renderer';

import {Button} from './button';
import {fireEvent, render, screen} from '@testing-library/react';

describe('<Button />', () => {
	it('should render correctly with text "Test Button Text"', () => {
		const element = renderer
			.create(<Button text='Test Button Text'/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly without text', () => {
		const element = renderer
			.create(<Button/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with disabled prop', () => {
		const element = renderer
			.create(<Button disabled={true}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with loader', () => {
		const element = renderer
			.create(<Button isLoader={true}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('callback function should be invoked after click', () => {
		const onClickAction = jest.fn();
		render(<Button onClick={onClickAction} text='button'/>);
		const button = screen.getByText('button');
		fireEvent.click(button);
		expect(onClickAction).toHaveBeenCalledTimes(1);
	});
});