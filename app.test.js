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
		console.log(component);
		expect(component.children[0]).toBe('11:30:00');
	});

	it('Prints 24-hour format', () => {
		const date = moment.tz('2013-06-08 16:30:00', 'UTC');
		const tz = 'Europe/Kiev';
		const component = renderer
			.create(<Time date={date} tz={tz} />)
			.toJSON();
		console.log(component);
		expect(component.children[0]).toBe('19:30:00');
	});

	it('Handles the Daylight Saving time', () => {
		const date = moment.tz('2013-06-08 09:30:00', 'UTC');
		const tz = 'Europe/Kiev';
		const component = renderer
			.create(<Time date={date} tz={tz} />)
			.toJSON();
		console.log(component);
		expect(component.children[0]).toBe('12:30:00');
	});

	it('Works for different timezones', () => {
		const date = moment.tz('2013-06-08 16:30:00', 'UTC');
		const tz = 'CET'; // we like Berlin
		const component = renderer
			.create(<Time date={date} tz={tz} />)
			.toJSON();
		console.log(component);
		expect(component.children[0]).toBe('18:30:00');
	});
});
