"use strict";

const ProgressBarContainer = ({ trials, nTrials }) => {
  const progress = (100 * trials) / nTrials;
  return (
    <div className={"progress-bar-container"}>
      <span>
        Progress: {trials} / {nTrials}
      </span>
      <div className={"progress-bar-bg"}>
        <div
          className={"progress-bar-fg"}
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

const ProgressBarContainerSurvey = ({ nItems, nSelected }) => {
  const progress = (100 * nSelected) / nItems;

  return (
    <div className={"progress-bar-container"}>
      <div className={"progress-bar-bg"}>
        <div
          className={"progress-bar-fg"}
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
    </div>
  );
};
