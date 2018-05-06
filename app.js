import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

export const Time = ({ date, tz }) => (
	<div>{moment.tz(date, tz).format('HH:mm:ss')}</div>
);

const tz = moment.tz.guess();

function render() {
	const now = moment();
	ReactDOM.render(
		<div className="red">
			<Time date={now} tz={tz} />
		</div>,
		document.getElementById('app'),
	);
}

setInterval(render);