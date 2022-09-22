"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var App = function App() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      workerId = _React$useState2[0],
      setWorkerId = _React$useState2[1]; // TODO: through prolific link

  var handleSubmit = function handleSubmit(e) {
    if (e.key == "Enter") {
      setWorkerId(e.target.value);
    }
  };

  var inputRef = React.useRef();

  // runs only once at the beginning to set focus on text input
  React.useEffect(function () {
    inputRef.current.focus();
  }, [inputRef]);

  return workerId ? React.createElement(Experiment, { workerId: workerId }) : React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "welcome" },
      React.createElement(
        "div",
        { className: "login" },
        React.createElement(
          "span",
          null,
          "Please enter your participant ID"
        ),
        React.createElement("input", {
          type: "text",
          className: "login-input",
          onKeyDown: function onKeyDown(e) {
            return handleSubmit(e);
          },
          ref: inputRef
        })
      )
    )
  );
};

var domContainer = document.querySelector("#react-container");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App, null));