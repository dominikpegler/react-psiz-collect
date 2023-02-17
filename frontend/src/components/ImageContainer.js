import {
  Tile,
  TileMini,
  TileMiniS1,
  TileMiniS2,
  TileQ,
  TileQMini,
  TileSpinner,
} from "./Buttons";
import { imgPaths } from "./imgPaths";

export const ImageContainer = ({
  stimulusSet,
  imgsLoaded,
  selection,
  handleSelect,
  handleZoom,
}) => {
  return (
    <>
      {imgsLoaded ? (
        <div className={"imgmat-container"}>
          <div className={"imgmat-row"}>
            <Tile
              id={5}
              imgPath={imgPaths[stimulusSet[5]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
            <Tile
              id={3}
              imgPath={imgPaths[stimulusSet[3]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
            <Tile
              id={6}
              imgPath={imgPaths[stimulusSet[6]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
          </div>
          <div className={"imgmat-row"}>
            <Tile
              id={1}
              imgPath={imgPaths[stimulusSet[1]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
            <TileQ imgPath={imgPaths[stimulusSet[0]]} handleZoom={handleZoom} />
            <Tile
              id={2}
              imgPath={imgPaths[stimulusSet[2]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
          </div>
          <div className={"imgmat-row"}>
            <Tile
              id={7}
              imgPath={imgPaths[stimulusSet[7]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
            <Tile
              id={4}
              imgPath={imgPaths[stimulusSet[4]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
            <Tile
              id={8}
              imgPath={imgPaths[stimulusSet[8]]}
              selection={selection}
              handleSelect={handleSelect}
              handleZoom={handleZoom}
            />
          </div>
        </div>
      ) : (
        <ImageContainerLoader />
      )}
    </>
  );
};

export const ImageContainerLoader = () => {
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

export const ImageContainerMini = () => {
  return (
    <div className={"imgmat-container-mini"}>
      <div className={"imgmat-row-mini"}>
        <TileMini />
        <TileMiniS1 />
        <TileMini />
      </div>
      <div className={"imgmat-row-mini"}>
        <TileMini />
        <TileQMini />
        <TileMiniS2 />
      </div>
      <div className={"imgmat-row-mini"}>
        <TileMini />
        <TileMini />
        <TileMini />
      </div>
    </div>
  );
};
