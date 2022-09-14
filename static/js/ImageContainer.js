"use strict";

var stimulusSet = [10, 32, 72, 43, 14, 59, 86, 27, 8];

var ImageContainer = function ImageContainer() {
  return React.createElement(
    "div",
    { className: "imgmat-container" },
    React.createElement(
      "div",
      { className: "imgmat-row" },
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[5]], className: "imgmat-img" })
      ),
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[3]], className: "imgmat-img" })
      ),
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[6]], className: "imgmat-img" })
      )
    ),
    React.createElement(
      "div",
      { className: "imgmat-row" },
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[1]], className: "imgmat-img" })
      ),
      React.createElement(
        "div",
        { className: "imgmat-img-cont imgmat-query-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[0]], className: "imgmat-img" })
      ),
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[2]], className: "imgmat-img" })
      )
    ),
    React.createElement(
      "div",
      { className: "imgmat-row" },
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[7]], className: "imgmat-img" })
      ),
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[4]], className: "imgmat-img" })
      ),
      React.createElement(
        "div",
        { className: "imgmat-img-cont" },
        React.createElement("img", { src: imgPaths[stimulusSet[8]], className: "imgmat-img" })
      )
    )
  );
};