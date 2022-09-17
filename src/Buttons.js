"use strict";

const SubmitButton = ({ handleSubmit, selection }) => {
  const disabled =
    selection === undefined ? true : selection.length == 2 ? false : true;
  return (
    <button onClick={() => handleSubmit()} disabled={disabled}>
      Submit Selection
    </button>
  );
};

const Tile = ({ id, imgPath, selection, handleSelect }) => {
  const selectableClass =
    selection === undefined
      ? ""
      : selection.length < 2
      ? " imgmat-tile-selectable"
      : "";
  const selectedClass =
    selection === undefined
      ? ""
      : selection.indexOf(id) > -1
      ? " imgmat-tile-selected"
      : "";
  return (
    <div className={"imgmat-tile" + selectableClass + selectedClass}>
      <div className={"imgmat-tile-inner"}>
        <div
          onClick={() => handleSelect(id)}
          className={"imgmat-tile-inner-inner"}
        >
          <img src={imgPath} className={"imgmat-img"} />
        </div>
        {selection &&
          {
            0: <div className="imgmat-img-overlay">1st Most Similar</div>,
            1: <div className="imgmat-img-overlay">2nd Most Similar</div>,
          }[selection.indexOf(id)]}
      </div>
    </div>
  );
};

const TileQ = ({ imgPath }) => (
  <div className={"imgmat-tile imgmat-tile-query"}>
    <img src={imgPath} className={"imgmat-img"} />
  </div>
);

const TileSpinner = () => (
  <div className={"imgmat-tile imgmat-tile-query imgmat-tile-spinner"}>
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  </div>
);
