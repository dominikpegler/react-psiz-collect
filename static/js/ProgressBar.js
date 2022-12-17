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

var ProgressBarContainerSurvey = function ProgressBarContainerSurvey(_ref2) {
  var nItems = _ref2.nItems,
      nSelected = _ref2.nSelected;

  var progress = 100 * nSelected / nItems;

  return React.createElement(
    "div",
    { className: "progress-bar-container" },
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