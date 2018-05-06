import React from 'react';
import { Time } from './app';
import renderer from 'react-test-renderer';
import moment from 'moment-timezone';

describe('<Time />', () => {
	it('Formats the time properly', () => {
		const date = moment.tz('2013-02-08 09:30:00', 'UTC');
		const tz = 'Europe/Kiev';
		const component = renderer
			.create(<Time date={date} tz={tz} />)
			.toJSON();
		expect(component.children[0]).toBe('11:30:00');
	});

	it('Handles the Daylight Saving time', () => {
		const date = moment.tz('2013-06-08 09:30:26', 'UTC');
		const tz = 'Europe/Kiev';
		const component = renderer
			.create(<Time date={date} tz={tz} />)
			.toJSON();
		console.log(component);
		expect(component.children[0]).toBe('12:30:26');
	});
});
