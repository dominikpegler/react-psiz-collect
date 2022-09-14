"use strict";

var Instructions = function Instructions() {
  return React.createElement(
    "div",
    { className: "instructions" },
    "Select the 2 tiles you consider most similar to the",
    " ",
    React.createElement(
      "span",
      { className: "instructions-txt" },
      "center tile"
    ),
    "."
  );
};