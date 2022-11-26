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

var Instructions = function Instructions() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h2",
      { style: { textAlign: "center" } },
      "Instructions "
    ),
    React.createElement(
      "ul",
      null,
      React.createElement(
        "li",
        null,
        React.createElement(
          "span",
          { className: "instructions-txt-1" },
          "Select the 2 tiles you consider most similar to the",
          " "
        ),
        React.createElement(
          "span",
          { className: "instructions-txt-2" },
          "center tile"
        ),
        "."
      ),
      React.createElement(
        "ul",
        null,
        React.createElement(
          "li",
          null,
          "Select the tiles in the order of their ",
          React.createElement(
            "b",
            null,
            "similarity"
          ),
          ". Once a tile has been selected, its ranking will be displayed."
        ),
        React.createElement(
          "li",
          null,
          "You can ",
          React.createElement(
            "b",
            null,
            "unselect"
          ),
          " a tile by clicking it again."
        ),
        React.createElement(
          "li",
          null,
          "You can ",
          React.createElement(
            "b",
            null,
            "enlarge"
          ),
          " an image by right-clicking on it."
        ),
        React.createElement(
          "li",
          null,
          "Some displays will be easy while others will be challenging. Just do your best when making your selection."
        )
      ),
      React.createElement(
        "li",
        null,
        "When you are happy with your selection, click ",
        React.createElement(
          "b",
          null,
          "Submit Selection"
        ),
        "."
      ),
      React.createElement(
        "li",
        { style: { flexDirection: "row" } },
        React.createElement(
          "span",
          null,
          "You can view the instructions at any time by clicking"
        ),
        " ",
        React.createElement(
          "button",
          { style: { width: "80px", height: "52px", cursor: "default" } },
          "?"
        ),
        "."
      )
    ),
    React.createElement(
      "h3",
      { style: { textAlign: "center" } },
      "Example:"
    )
  );
};