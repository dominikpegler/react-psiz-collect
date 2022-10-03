"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var SERVER_URL = "http://127.0.0.1:5000";

var App = function App() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      workerId = _React$useState2[0],
      setWorkerId = _React$useState2[1];

  var _React$useState3 = React.useState(false),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      confirmed = _React$useState4[0],
      setConfirmed = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      backendConnected = _React$useState6[0],
      setBackendConnected = _React$useState6[1];

  var handleSubmit = function handleSubmit(e) {
    if (e.key == "Enter") {
      setWorkerId(e.target.value);
    }
  };

  var testConnection = function testConnection() {
    fetch(SERVER_URL + "/test-backend-connection/").then(function (response) {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(function () {
      setBackendConnected(true);
    }).catch(function (err) {
      console.log("Connection with backend failed.");
      console.log("Error:", err.toString());
    });
  };

  var handleConfirmed = function handleConfirmed() {
    setConfirmed(true);
  };

  var inputRef = React.useRef();
  // runs only once at the beginning to set focus on text input
  // and set workerId from url params
  React.useEffect(function () {
    console.log("Effect, if runs 2x at startup that's fine :)");
    if (typeof PROLIFIC_PID !== "undefined") {
      setWorkerId(PROLIFIC_PID);
    } else if (backendConnected) {
      inputRef.current.focus();
    }
    testConnection();
  }, [inputRef, backendConnected]);

  return backendConnected ? workerId ? confirmed ? React.createElement(Experiment, { workerId: workerId }) : React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "welcome" },
      React.createElement(
        "div",
        { className: "instructions" },
        React.createElement(Instructions, null),
        React.createElement(ImageContainerMini, null),
        React.createElement(
          "button",
          {
            type: "text",
            className: "proceed-button",
            onClick: function onClick() {
              return handleConfirmed();
            }
          },
          "Start"
        )
      )
    )
  ) : React.createElement(
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
  ) : React.createElement("div", { className: "container" });
};

var domContainer = document.querySelector("#react-container");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App, null));