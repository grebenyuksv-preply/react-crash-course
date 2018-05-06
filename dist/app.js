//	ReactJS + JSX
//	again, a root div ...
var reactRootDiv = document.createElement('div');
document.body.appendChild(reactRootDiv);

//	... and mount a React Component there
var reactAppDiv = React.createElement(
  "div",
  { className: "red" },
  "Div created with ReactJS + JSX"
);
ReactDOM.render(reactAppDiv, reactRootDiv);
