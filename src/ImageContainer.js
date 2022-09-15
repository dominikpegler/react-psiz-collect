"use strict";


const ImageContainer = ({ stimulusSet, imgsLoaded }) => {
  const [selected, setSelected] = React.useState([]);

  return (<React.Fragment>
    {imgsLoaded ?
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
      </div> : <ImageContainerLoader />}</React.Fragment>
  );
};


const ImageContainerLoader = () => {
  return (
    <div className={"imgmat-container"}>
      <div className={"imgmat-row"}>
        <Tile />
        <Tile />
        <Tile />
      </div>
      <div className={"imgmat-row"}>
        <Tile />
        <TileSpinner />
        <Tile />
      </div>
      <div className={"imgmat-row"}>
        <Tile />
        <Tile />
        <Tile />
      </div>
    </div>
  );
};
