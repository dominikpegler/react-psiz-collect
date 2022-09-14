"use strict";

const ProgressBar = ({ trials, nTrials }) => {
  return (
    <div className={"progress-bar"}>
      Progress: {trials} / {nTrials}
      <br />
      <code>{"●".repeat(trials) + "○".repeat(nTrials - trials)}</code>
    </div>
  );
};
