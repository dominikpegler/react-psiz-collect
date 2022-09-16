"use strict";

const Button1 = ({ onClickButton, disabled }) => {
  return (
    <button onClick={() => onClickButton()} disabled={disabled}>
      Submit Selection
    </button>
  );
};

const Tile = ({ id, imgPath, selection, setSelection }) => {
  const [selectOrder, setSelectOrder] = React.useState(0);

  const tileClicked = (id) => {
    const selectionNew = selection;
    const nSelected = selectionNew.length;
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

  return (
    <div
      className={
        {
          2: "imgmat-tile imgmat-tile-selected",
          1: "imgmat-tile imgmat-tile-selected",
          0: "imgmat-tile",
        }[selectOrder]
      }
      onClick={() => tileClicked(id)}
    >
      <div className={"imgmat-tile-inner"}>
        <div className={"imgmat-tile-inner-inner"}>
          <img src={imgPath} className={"imgmat-img"} />
        </div>
        <div className="imgmat-img-overlay">
          {{ 0: "", 1: "1st Most Similar", 2: "2nd Most Similar" }[selectOrder]}
        </div>
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
    </div>{" "}
  </div>
);
