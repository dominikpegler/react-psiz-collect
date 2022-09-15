"use strict";

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

var Tile = function Tile(_ref2) {
  var imgPath = _ref2.imgPath;
  return React.createElement(
    "div",
    { className: "imgmat-tile" },
    React.createElement("img", { src: imgPath, className: "imgmat-img" })
  );
};

var TileQ = function TileQ(_ref3) {
  var imgPath = _ref3.imgPath;
  return React.createElement(
    "div",
    { className: "imgmat-tile imgmat-tile-query" },
    React.createElement("img", { src: imgPath, className: "imgmat-img" })
  );
};

var TileSpinner = function TileSpinner() {
  return React.createElement(
    "div",
    { className: "imgmat-tile imgmat-tile-query" },
    React.createElement(
      "div",
      { className: "spinner-container" },
      React.createElement("div", { className: "loading-spinner" })
    ),
    "  "
  );
};