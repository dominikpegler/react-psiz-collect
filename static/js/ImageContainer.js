"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var ImageContainer = function ImageContainer(_ref) {
  var stimulusSet = _ref.stimulusSet,
      imgsLoaded = _ref.imgsLoaded;

  var _React$useState = React.useState([]),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      selected = _React$useState2[0],
      setSelected = _React$useState2[1];

  return React.createElement(
    React.Fragment,
    null,
    imgsLoaded ? React.createElement(
      "div",
      { className: "imgmat-container" },
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[5]] }),
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[3]] }),
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[6]] })
      ),
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[1]] }),
        React.createElement(TileQ, { imgPath: imgPaths[stimulusSet[0]] }),
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[2]] })
      ),
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[7]] }),
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[4]] }),
        React.createElement(Tile, { imgPath: imgPaths[stimulusSet[8]] })
      )
    ) : React.createElement(ImageContainerLoader, null)
  );
};

var ImageContainerLoader = function ImageContainerLoader() {
  return React.createElement(
    "div",
    { className: "imgmat-container" },
    React.createElement(
      "div",
      { className: "imgmat-row" },
      React.createElement(Tile, null),
      React.createElement(Tile, null),
      React.createElement(Tile, null)
    ),
    React.createElement(
      "div",
      { className: "imgmat-row" },
      React.createElement(Tile, null),
      React.createElement(TileSpinner, null),
      React.createElement(Tile, null)
    ),
    React.createElement(
      "div",
      { className: "imgmat-row" },
      React.createElement(Tile, null),
      React.createElement(Tile, null),
      React.createElement(Tile, null)
    )
  );
};