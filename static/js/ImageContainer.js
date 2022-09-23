"use strict";

var ImageContainer = function ImageContainer(_ref) {
  var stimulusSet = _ref.stimulusSet,
      imgsLoaded = _ref.imgsLoaded,
      selection = _ref.selection,
      handleSelect = _ref.handleSelect;

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
          handleSelect: handleSelect
        }),
        React.createElement(Tile, {
          id: 3,
          imgPath: imgPaths[stimulusSet[3]],
          selection: selection,
          handleSelect: handleSelect
        }),
        React.createElement(Tile, {
          id: 6,
          imgPath: imgPaths[stimulusSet[6]],
          selection: selection,
          handleSelect: handleSelect
        })
      ),
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, {
          id: 1,
          imgPath: imgPaths[stimulusSet[1]],
          selection: selection,
          handleSelect: handleSelect
        }),
        React.createElement(TileQ, { imgPath: imgPaths[stimulusSet[0]] }),
        React.createElement(Tile, {
          id: 2,
          imgPath: imgPaths[stimulusSet[2]],
          selection: selection,
          handleSelect: handleSelect
        })
      ),
      React.createElement(
        "div",
        { className: "imgmat-row" },
        React.createElement(Tile, {
          id: 7,
          imgPath: imgPaths[stimulusSet[7]],
          selection: selection,
          handleSelect: handleSelect
        }),
        React.createElement(Tile, {
          id: 4,
          imgPath: imgPaths[stimulusSet[4]],
          selection: selection,
          handleSelect: handleSelect
        }),
        React.createElement(Tile, {
          id: 8,
          imgPath: imgPaths[stimulusSet[8]],
          selection: selection,
          handleSelect: handleSelect
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

var ImageContainerMini = function ImageContainerMini() {
  return React.createElement(
    "div",
    { className: "imgmat-container-mini" },
    React.createElement(
      "div",
      { className: "imgmat-row-mini" },
      React.createElement(TileMini, null),
      React.createElement(TileMiniS1, null),
      React.createElement(TileMini, null)
    ),
    React.createElement(
      "div",
      { className: "imgmat-row-mini" },
      React.createElement(TileMini, null),
      React.createElement(TileQMini, null),
      React.createElement(TileMiniS2, null)
    ),
    React.createElement(
      "div",
      { className: "imgmat-row-mini" },
      React.createElement(TileMini, null),
      React.createElement(TileMini, null),
      React.createElement(TileMini, null)
    )
  );
};