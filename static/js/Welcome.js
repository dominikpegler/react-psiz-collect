"use strict";

var Welcome = function Welcome(_ref) {
  var setShowWelcomeScreen = _ref.setShowWelcomeScreen;

  return React.createElement(
    "div",
    { className: "container welcome start" },
    React.createElement(
      "p",
      null,
      "Welcome to our experiment!"
    ),
    React.createElement(
      "p",
      null,
      "We ask you to perform this experiment within a single uninterrupted session, in a silent environment, while sitting in comfortable but alert posture. Please do the experiment when you can dedicate 25 minutes of undivided attention to it, without multitasking (e.g., using your phone or other devices)."
    ),
    React.createElement("img", { alt: "instruction icons", src: "static/img/instruction_icons.png" }),
    React.createElement(
      "p",
      null,
      "Click the button below to continue."
    ),
    React.createElement(
      "button",
      {
        type: "text",
        className: "proceed-button",
        onClick: function onClick() {
          return setShowWelcomeScreen(false);
        }
      },
      "Continue"
    )
  );
};