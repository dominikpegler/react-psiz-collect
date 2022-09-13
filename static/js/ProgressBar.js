"use strict";

var ProgressBar = function ProgressBar() {
  return React.createElement(
    "div",
    { className: "progress-bar" },
    "Progress: ",
    React.createElement(
      "code",
      null,
      "[●●●●●●●●●●●●●●●●●●●●●●●○○○○○○○○○○○○○○○]"
    )
  );
};