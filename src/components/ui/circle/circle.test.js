import renderer from 'react-test-renderer';
import React from 'react';

import {Circle} from './circle';
import {ElementStates} from '../../../types/element-states';

describe('<Circle />', () => {
	it('should render correctly without letters', () => {
		const element = renderer
			.create(<Circle/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with letters "test"', () => {
		const element = renderer
			.create(<Circle letter='test'/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with value "head" at prop head', () => {
		const element = renderer
			.create(<Circle head='head'/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with ReactElement <Circle /> at prop head ', () => {
		const element = renderer
			.create(<Circle head={<Circle/>}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with value "tail" at prop tail', () => {
		const element = renderer
			.create(<Circle tail='tail'/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with ReactElement <Circle /> at prop tail ', () => {
		const element = renderer
			.create(<Circle tail={<Circle/>}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with value 1 at prop index', () => {
		const element = renderer
			.create(<Circle index={1}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with enabled prop isSmall', () => {
		const element = renderer
			.create(<Circle isSmall/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with default state', () => {
		const element = renderer
			.create(<Circle state={ElementStates.Default}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with changing state', () => {
		const element = renderer
			.create(<Circle state={ElementStates.Changing}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});

	it('should render correctly with modified state', () => {
		const element = renderer
			.create(<Circle state={ElementStates.Changing}/>)
			.toJSON();
		expect(element).toMatchSnapshot();
	});
})