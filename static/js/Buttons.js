"use strict";

var SubmitButton = function SubmitButton(_ref) {
  var handleSubmit = _ref.handleSubmit,
      selection = _ref.selection;

  var disabled = selection === undefined ? true : selection.length == 2 ? false : true;
  return React.createElement(
    "button",
    { onClick: function onClick() {
        return handleSubmit();
      }, disabled: disabled },
    "Submit Selection"
  );
};

var Tile = function Tile(_ref2) {
  var id = _ref2.id,
      imgPath = _ref2.imgPath,
      selection = _ref2.selection,
      handleSelect = _ref2.handleSelect;

  var selectableClass = selection === undefined ? "" : selection.length < 2 ? " imgmat-tile-selectable" : "";
  var selectedClass = selection === undefined ? "" : selection.indexOf(id) > -1 ? " imgmat-tile-selected" : "";
  return React.createElement(
    "div",
    { className: "imgmat-tile" + selectableClass + selectedClass },
    React.createElement(
      "div",
      { className: "imgmat-tile-inner" },
      React.createElement(
        "div",
        {
          onClick: function onClick() {
            return handleSelect(id);
          },
          className: "imgmat-tile-inner-inner"
        },
        React.createElement("img", { src: imgPath, className: "imgmat-img" })
      ),
      selection && {
        0: React.createElement(
          "div",
          { className: "imgmat-img-overlay" },
          "1st Most Similar"
        ),
        1: React.createElement(
          "div",
          { className: "imgmat-img-overlay" },
          "2nd Most Similar"
        )
      }[selection.indexOf(id)]
    )
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
    { className: "imgmat-tile imgmat-tile-query imgmat-tile-spinner" },
    React.createElement(
      "div",
      { className: "spinner-container" },
      React.createElement("div", { className: "loading-spinner" })
    )
  );
};