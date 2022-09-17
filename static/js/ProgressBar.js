"use strict";

var ProgressBarContainer = function ProgressBarContainer(_ref) {
  var trials = _ref.trials,
      nTrials = _ref.nTrials;

  var progress = 100 * trials / nTrials;
  return React.createElement(
    "div",
    { className: "progress-bar-container" },
    React.createElement(
      "span",
      null,
      "Progress: ",
      trials,
      " / ",
      nTrials
    ),
    React.createElement(
      "div",
      { className: "progress-bar-bg" },
      React.createElement("div", {
        className: "progress-bar-fg",
        style: {
          width: progress + "%"
        }
      })
    )
  );
};