"use strict";

var Prompt = function Prompt() {
  return React.createElement(
    "div",
    { className: "prompt" },
    React.createElement(
      "span",
      { className: "prompt-txt-1" },
      "Select the 2 tiles you consider most similar to the",
      " "
    ),
    React.createElement(
      "span",
      { className: "prompt-txt-2" },
      "center tile"
    ),
    "."
  );
};