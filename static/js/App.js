"use strict";

// Base container

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var BaseContainer = function BaseContainer() {
  {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        buttonClicks = _React$useState2[0],
        setButtonClicks = _React$useState2[1];

    var _onClickButton = function _onClickButton() {
      setButtonClicks(buttonClicks + 1);
    };

    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(ProgressBar, null),
      React.createElement(Instructions, null),
      React.createElement(ImageContainer, null),
      React.createElement(Button1, { onClickButton: function onClickButton() {
          return _onClickButton();
        } }),
      React.createElement(
        "p",
        null,
        "Button was clicked ",
        buttonClicks,
        " times"
      )
    );
  }
};

var domContainer = document.querySelector("#react-container");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(BaseContainer, null));