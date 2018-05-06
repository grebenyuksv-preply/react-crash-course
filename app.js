function Timer(date) {
	var div = document.createElement('div');
	div.className = 'red';
	div.innerHTML = `${date.toLocaleTimeString()}`;
	return div;
}

function render() {
	var now = new Date();

	document.getElementById('app').innerHTML = '';
	document.getElementById('app').appendChild(Timer(now));
}

setInterval(render);
