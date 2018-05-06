import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment-timezone';

export const Time = () => (
	<div>{moment().format('HH:mm:ss')}</div>
);

function render() {
	ReactDOM.render(
		<div className="red">
			<Time />
		</div>,
		document.getElementById('app'),
	);
}

setInterval(render);