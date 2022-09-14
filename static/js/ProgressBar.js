"use strict";

var ProgressBar = function ProgressBar(_ref) {
  var trials = _ref.trials,
      nTrials = _ref.nTrials;

  return React.createElement(
    "div",
    { className: "progress-bar" },
    "Progress: ",
    trials,
    " / ",
    nTrials,
    React.createElement("br", null),
    React.createElement(
      "code",
      null,
      "●".repeat(trials) + "○".repeat(nTrials - trials)
    )
  );
};