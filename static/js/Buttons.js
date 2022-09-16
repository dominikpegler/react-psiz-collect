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
      selectOrder = _React$useState2[0],
      setSelectOrder = _React$useState2[1];

  var tileClicked = function tileClicked(id) {
    var selectionNew = selection;
    var nSelected = selectionNew.length;
    if (selection.includes(id)) {
      selectionNew.splice(selection.indexOf(id), 1);
      setSelectOrder(selectionNew);
    } else if (nSelected < 2) {
      selectionNew.push(id);
      setSelection(selectionNew);
    }
    if (selectOrder > 0) {
      setSelectOrder(0);
    } else if (selectOrder == 0) {
      if (nSelected < 2) {
        setSelectOrder(nSelected + 1);
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
      }[selectOrder],
      onClick: function onClick() {
        return tileClicked(id);
      }
    },
    React.createElement(
      "div",
      { className: "imgmat-tile-inner" },
      React.createElement(
        "div",
        { className: "imgmat-tile-inner-inner" },
        React.createElement("img", { src: imgPath, className: "imgmat-img" })
      ),
      React.createElement(
        "div",
        { className: "imgmat-img-overlay" },
        { 0: "", 1: "1st Most Similar", 2: "2nd Most Similar" }[selectOrder]
      )
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
    ),
    " "
  );
};