"use strict";

const Button1 = ({ onClickButton }) => {
  return <button onClick={() => onClickButton()}>Submit Selection</button>;
};

const Tile = ({ imgPath }) => (
  <div className={"imgmat-tile"}>
    <img src={imgPath} className={"imgmat-img"} />
  </div>
);

const TileQ = ({ imgPath }) => (
  <div className={"imgmat-tile imgmat-tile-query"}>
    <img src={imgPath} className={"imgmat-img"} />
  </div>
);
