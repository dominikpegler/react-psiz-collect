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

// const ProgressBarContainer = ({ trials, nTrials }) => {
//   return (
//     <div className={"progress-bar-container"}>
//       Progress: {trials} / {nTrials}
//       <br />
//       <code>{"●".repeat(trials) + "○".repeat(nTrials - trials)}</code>
//     </div>
//   );
// };
