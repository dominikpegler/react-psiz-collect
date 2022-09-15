"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Button1 = function Button1(_ref) {
  var onClickButton = _ref.onClickButton,
      disabled = _ref.disabled;

  return React.createElement(
    "button",
    { onClick: function onClick() {
        return onClickButton();
      }, disabled: disabled },
    "Submit Selection"
  );
};

var Tile = function Tile(_ref2) {
  var id = _ref2.id,
      imgPath = _ref2.imgPath,
      selection = _ref2.selection,
      setSelection = _ref2.setSelection;

  var _React$useState = React.useState(0),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      isSelected = _React$useState2[0],
      setIsSelected = _React$useState2[1];

  var tileClicked = function tileClicked(id) {
    var selectionTmp = selection;
    var lengthTmp = selectionTmp.length;
    if (selection.includes(id)) {
      selectionTmp.splice(selection.indexOf(id), 1);
      setSelection(selectionTmp);
    } else if (lengthTmp < 2) {
      selectionTmp.push(id);
      setSelection(selectionTmp);
    }
    if (isSelected > 0) {
      setIsSelected(0);
    } else if (isSelected == 0) {
      if (lengthTmp < 2) {
        setIsSelected(lengthTmp + 1);
      }
    }
    console.log("Current selection:", selection);
  };

  return React.createElement(
    "div",
    {
      className: {
        2: "imgmat-tile imgmat-tile-selected",
        1: "imgmat-tile imgmat-tile-selected",
        0: "imgmat-tile"
      }[isSelected],
      onClick: function onClick() {
        return tileClicked(id);
      }
    },
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
    " "
  );
};