"use strict";

const stimulusSet = [10, 32, 72, 43, 14, 59, 86, 27, 8];

const ImageContainer = () => {
  return (
    <div className={"imgmat-container"}>
      {stimulusSet.map((el, i) => (
        <div key={i}>imgPaths[{el}]</div>
      ))}
    </div>
  );
};
