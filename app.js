//	ReactJS
//	give it a root div ...
var div = document.createElement('div');
document.body.appendChild(div);

//	... and mount a React Component there
var reactDiv = React.createElement(
	'div',
	{
		className: 'red',
	},
	['Div created with ReactJS'],
);
ReactDOM.render(reactDiv, div);
