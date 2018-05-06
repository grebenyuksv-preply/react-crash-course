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
			<label key={hoursFormatOption}>
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

class App extends React.Component {
	componentDidMount() {
		const { state } = this.props;
		fetchTime(state);
	}
	render() {
		const { state, handleOptionChange } = this.props;
		const { systemTime, hoursFormat, systemTZ, serverTime } = state;
		if (!serverTime.data) {
			return <div className="red">Loading</div>;
		}
		const now = moment(serverTime.data + systemTime - serverTime.fetchedAt);
		return (
			<div>
				Time format:
				<SelectTimeFormat
					hoursFormat={hoursFormat}
					onChange={handleOptionChange}
				/>
				<hr />
				Your Time:
				<Time date={now} tz={systemTZ} hoursFormat={hoursFormat} />
				Berlin Time:
				<Time date={now} tz={'CET'} hoursFormat={hoursFormat} />
				New York Time:
				<Time
					date={now}
					tz={'America/New_York'}
					hoursFormat={hoursFormat}
				/>
			</div>
		);
	}
}

const state = {
	systemTZ: moment.tz.guess(),
	hoursFormat: 24,
	systemTime: null,
	serverTime: {
		data: null,
		fetchedAtSystemTime: null,
		isFetching: false,
	},
};

function handleOptionChange(event) {
	state.hoursFormat = parseInt(event.target.value, 10);
}

function tick() {
	state.systemTime = moment();
}

function fetchTime(state) {
	const { serverTime } = state;
	if (!serverTime.data && !serverTime.isFetching) {
		serverTime.isFetching = true;
		fetch('http://worldclockapi.com/api/json/utc/now').then(
			response => {
				if (response.ok) {
					return response.json().then(body => {
						serverTime.data = moment(body.currentDateTime);
						serverTime.fetchedAt = moment();
						serverTime.isFetching = false;
					});
				}
			},
			error => {
				console.log('Error:', error);
				//	retry
				serverTime.isFetching = false;
				fetchTime(serverTime);
			},
		);
	}
}

function render() {
	tick();
	ReactDOM.render(
		<App state={state} handleOptionChange={handleOptionChange} />,
		document.getElementById('app'),
	);
}

setInterval(render, 1000);
