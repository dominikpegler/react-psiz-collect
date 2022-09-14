"use strict";

const stimulusSet = [10, 32, 72, 43, 14, 59, 86, 27, 8];

const ImageContainer = () => {
  return (
    <div className={"imgmat-container"}>
      <div className={"imgmat-row"}>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[5]]} className={"imgmat-img"} />
        </div>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[3]]} className={"imgmat-img"} />
        </div>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[6]]} className={"imgmat-img"} />
        </div>
      </div>
      <div className={"imgmat-row"}>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[1]]} className={"imgmat-img"} />
        </div>
        <div className={"imgmat-img-cont imgmat-query-cont"}>
          <img src={imgPaths[stimulusSet[0]]} className={"imgmat-img"} />
        </div>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[2]]} className={"imgmat-img"} />
        </div>
      </div>
      <div className={"imgmat-row"}>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[7]]} className={"imgmat-img"} />
        </div>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[4]]} className={"imgmat-img"} />
        </div>
        <div className={"imgmat-img-cont"}>
          <img src={imgPaths[stimulusSet[8]]} className={"imgmat-img"} />
        </div>
      </div>
    </div>
  );
};
