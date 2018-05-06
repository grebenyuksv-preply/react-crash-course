import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

export const Time = ({ date, tz, hoursFormat }) => {
	const timeformat = hoursFormat === 24 ? 'HH:mm:ss' : 'hh:mm:ss';
	return <div>{moment.tz(date, tz).format(timeformat)}</div>;
};

const SelectTimeFormat = ({ hoursFormat, onChange }) => (
	<form>
		{[12, 24].map(hoursFormatOption => (
			<label>
				<input
					type="radio"
					value={hoursFormatOption}
					checked={hoursFormat === hoursFormatOption}
					onChange={onChange}
				/>
				{hoursFormatOption}-hour
			</label>
		))}
	</form>
);

const state = {
	tz: moment.tz.guess(),
	hoursFormat: 24,
	now: null,
};

function handleOptionChange(event) {
	state.hoursFormat = parseInt(event.target.value, 10);
}

function tick() {
	state.now = moment();
}

function render() {
	tick();
	const { now, hoursFormat, tz } = state;

	ReactDOM.render(
		<div>
			Time format:
			<SelectTimeFormat
				hoursFormat={hoursFormat}
				onChange={handleOptionChange}
			/>
			Time:
			<div className="red">
				<Time date={now} tz={tz} hoursFormat={hoursFormat} />
			</div>
		</div>,
		document.getElementById('app'),
	);
}

setInterval(render);