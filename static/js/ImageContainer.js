"use strict";

var stimulusSet = [10, 32, 72, 43, 14, 59, 86, 27, 8];

var ImageContainer = function ImageContainer() {
  return React.createElement(
    "div",
    { className: "imgmat-container" },
    stimulusSet.map(function (el, i) {
      return React.createElement(
        "div",
        { key: i },
        "imgPaths[",
        el,
        "]"
      );
    })
  );
};