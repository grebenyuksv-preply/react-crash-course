import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import moment from 'moment-timezone';

export const Time = ({ date, tz, hoursFormat }) => {
	const timeformat = hoursFormat === 24 ? 'HH:mm:ss' : 'hh:mm:ss';
	return <div>{moment.tz(date, tz).format(timeformat)}</div>;
};

class SelectTimeFormat extends React.Component {
	shouldComponentUpdate(nextProps) {
		return nextProps.hoursFormat !== this.props.hoursFormat;
	}
	render() {
		const { hoursFormat, onChange } = this.props;
		return (
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
	}
}

class App extends React.Component {
	componentDidMount() {
		fetchTime();
	}
	render() {
		const { state, handleOptionChange } = this.props;
		const { systemTime, hoursFormat, systemTZ, serverTime } = state;
		if (!serverTime.data) {
			return <div className="red">Loading</div>;
		}
		const now = moment(
			serverTime.data + systemTime - serverTime.fetchedAtSystemTime,
		);
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

const reducer = (state, action) => {
	switch (action.type) {
		case 'TICK':
			const systemTime = action.payload;
			return {
				...state,
				systemTime,
			};
		case 'SELECT_HOURS_FORMAT':
			const hoursFormat = action.payload;
			return {
				...state,
				hoursFormat,
			};
		case 'FETCH_SERVER_TIME':
			return {
				...state,
				serverTime: {
					...state.serverTime,
					isFetching: true,
				},
			};
		case 'RECEIVE_SERVER_TIME':
			const time = action.payload;
			return {
				...state,
				serverTime: {
					data: time,
					isFetching: false,
					fetchedAtSystemTime: state.systemTime,
				},
			};
		case 'ERROR_FETCHING_SERVER_TIME':
			return {
				...state,
				serverTime: {
					isFetching: false,
				},
			};
	}
	return state;
};

const store = createStore(
	reducer,
	state,
	window.__REDUX_DEVTOOLS_EXTENSION__ &&
		window.__REDUX_DEVTOOLS_EXTENSION__(),
);

function handleOptionChange(event) {
	const hoursFormat = parseInt(event.target.value, 10);
	store.dispatch({
		type: 'SELECT_HOURS_FORMAT',
		payload: hoursFormat,
	});
}

function tick() {
	const systemTime = moment();
	store.dispatch({
		type: 'TICK',
		payload: systemTime,
	});
}

function fetchTime() {
	const { serverTime } = store.getState();
	if (!serverTime.data && !serverTime.isFetching) {
		serverTime.isFetching = true;
		store.dispatch({
			type: 'FETCH_SERVER_TIME',
		});
		fetch('http://worldclockapi.com/api/json/utc/now').then(
			response => {
				if (response.ok) {
					return response.json().then(body => {
						const time = moment(body.currentDateTime);
						store.dispatch({
							type: 'RECEIVE_SERVER_TIME',
							payload: time,
						});
					});
				}
			},
			error => {
				console.log('Error:', error);
				store.dispatch({
					type: 'ERROR_FETCHING_SERVER_TIME',
				});
				fetchTime();
			},
		);
	}
}

store.subscribe(state =>
	ReactDOM.render(
		<App
			state={store.getState()}
			handleOptionChange={handleOptionChange}
		/>,
		document.getElementById('app'),
	),
);

setInterval(tick, 1000);
