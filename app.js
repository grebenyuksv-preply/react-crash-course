import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

export const Time = ({ date, tz }) => (
	<div>{moment.tz(date, tz).format('HH:mm:ss')}</div>
);

function render() {
	var now = new Date();

	ReactDOM.render(
		<div className="red">
			<Time date={now} />
		</div>,
		document.getElementById('app'),
	);
}

setInterval(render);
