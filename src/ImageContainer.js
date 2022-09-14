"use strict";

const stimulusSet = [10, 32, 72, 43, 14, 59, 86, 27, 8];

const ImageContainer = () => {
  const [selected, setSelected] = React.useState([]);

  return (
    <div className={"imgmat-container"}>
      <div className={"imgmat-row"}>
        <Tile imgPath={imgPaths[stimulusSet[5]]} />
        <Tile imgPath={imgPaths[stimulusSet[3]]} />
        <Tile imgPath={imgPaths[stimulusSet[6]]} />
      </div>
      <div className={"imgmat-row"}>
        <Tile imgPath={imgPaths[stimulusSet[1]]} />
        <TileQ imgPath={imgPaths[stimulusSet[0]]} />
        <Tile imgPath={imgPaths[stimulusSet[2]]} />
      </div>
      <div className={"imgmat-row"}>
        <Tile imgPath={imgPaths[stimulusSet[7]]} />
        <Tile imgPath={imgPaths[stimulusSet[4]]} />
        <Tile imgPath={imgPaths[stimulusSet[8]]} />
      </div>
    </div>
  );
};
