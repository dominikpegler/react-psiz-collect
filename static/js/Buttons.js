"use strict";
// A React component

var Button1 = function Button1(_ref) {
  var onClickButton = _ref.onClickButton;

  return React.createElement(
    "button",
    { onClick: function onClick() {
        return onClickButton();
      } },
    "Submit Selection"
  );
};