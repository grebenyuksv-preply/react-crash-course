function render() {
	var appDiv = document.createElement('div');
	appDiv.className = 'red';
	appDiv.innerHTML = 'Vanilla JS div';

	document.getElementById('app').innerHTML = '';
	document.getElementById('app').appendChild(appDiv);
}

render();
