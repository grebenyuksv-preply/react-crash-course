function render() {
	ReactDOM.render(React.createElement(
		"div",
		{ className: "red" },
		"Div created with ReactJS + JSX"
	), document.getElementById('app'));
}

render();
