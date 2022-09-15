"use strict";

var ImageContainer = function ImageContainer(_ref) {
  var stimulusSet = _ref.stimulusSet,
      imgsLoaded = _ref.imgsLoaded,
      selection = _ref.selection,
      setSelection = _ref.setSelection;

  return React.createElement(
    React.Fragment,
    null,
    imgsLoaded ? React.createElement(
      "div",
      { className: "imgmat-container" },
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, {
          id: 5,
          imgPath: imgPaths[stimulusSet[5]],
          selection: selection,
          setSelection: setSelection
        }),
        React.createElement(Tile, {
          id: 3,
          imgPath: imgPaths[stimulusSet[3]],
          selection: selection,
          setSelection: setSelection
        }),
        React.createElement(Tile, {
          id: 6,
          imgPath: imgPaths[stimulusSet[6]],
          selection: selection,
          setSelection: setSelection
        })
      ),
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, {
          id: 1,
          imgPath: imgPaths[stimulusSet[1]],
          selection: selection,
          setSelection: setSelection
        }),
        React.createElement(TileQ, { imgPath: imgPaths[stimulusSet[0]] }),
        React.createElement(Tile, {
          id: 2,
          imgPath: imgPaths[stimulusSet[2]],
          selection: selection,
          setSelection: setSelection
        })
      ),
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, {
          id: 7,
          imgPath: imgPaths[stimulusSet[7]],
          selection: selection,
          setSelection: setSelection
        }),
        React.createElement(Tile, {
          id: 4,
          imgPath: imgPaths[stimulusSet[4]],
          selection: selection,
          setSelection: setSelection
        }),
        React.createElement(Tile, {
          id: 8,
          imgPath: imgPaths[stimulusSet[8]],
          selection: selection,
          setSelection: setSelection
        })
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