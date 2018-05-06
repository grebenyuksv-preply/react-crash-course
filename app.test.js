import React from 'react';
import { Time } from './app';
import renderer from 'react-test-renderer';
import moment from 'moment-timezone';

describe('<Time />', () => {
	it('Formats the time properly', () => {
		const component = renderer
			.create(<Time />)
			.toJSON();
		console.log(component);

		//	no way to make it work
		expect(component.children[0]).toBe("20:57:56"); 
	});
});
