"use strict";

const Button1 = ({ onClickButton, disabled }) => {
  return (
    <button onClick={() => onClickButton()} disabled={disabled}>
      Submit Selection
    </button>
  );
};

const Tile = ({ id, imgPath, selection, setSelection }) => {
  const [isSelected, setIsSelected] = React.useState(0);

  const tileClicked = (id) => {
    const selectionTmp = selection;
    const lengthTmp = selectionTmp.length;
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

  return (
    <div
      className={
        {
          2: "imgmat-tile imgmat-tile-selected",
          1: "imgmat-tile imgmat-tile-selected",
          0: "imgmat-tile",
        }[isSelected]
      }
      onClick={() => tileClicked(id)}
    >
      <img src={imgPath} className={"imgmat-img"} />
    </div>
  );
};

const TileQ = ({ imgPath }) => (
  <div className={"imgmat-tile imgmat-tile-query"}>
    <img src={imgPath} className={"imgmat-img"} />
  </div>
);

const TileSpinner = () => (
  <div className={"imgmat-tile imgmat-tile-query"}>
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>{" "}
  </div>
);
