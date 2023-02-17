"use strict";

export const Welcome = ({ setShowWelcomeScreen }) => {
  return (
    <div className={"container welcome start"}>
      <p>Welcome to our experiment!</p>

      <p>
        We ask you to perform this experiment within a single uninterrupted
        session, in a silent environment, while sitting in comfortable but alert
        posture. Please do the experiment when you can dedicate 25 minutes of
        undivided attention to it, without multitasking (e.g., using your phone
        or other devices).
      </p>
      <img alt="instruction icons" src="static/img/instruction_icons.png" />
      <p>Click the button below to continue.</p>
      <button
        type="text"
        className={"proceed-button"}
        onClick={() => setShowWelcomeScreen(false)}
      >
        Continue
      </button>
    </div>
  );
};
