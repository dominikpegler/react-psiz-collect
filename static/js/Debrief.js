var Debrief = function Debrief(_ref) {
  var handleDebrief = _ref.handleDebrief;


  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "consent", style: { maxWidth: "720px" } },
      React.createElement(
        "h3",
        { style: { textAlign: "center" } },
        "Study feedback"
      ),
      React.createElement(
        "p",
        null,
        "Dear Participant,"
      ),
      React.createElement(
        "p",
        null,
        "Thank you for participating in our research study. We hope that you found the experience interesting and informative."
      ),
      React.createElement(
        "p",
        null,
        "The purpose of this study was to examine how fear-eliciting simuli are mentally represented."
      ),
      React.createElement(
        "p",
        null,
        "If you have any questions or concerns about your participation in this study, please do not hesitate to contact us at a01468373@unet.univie.ac.at"
      ),
      React.createElement(
        "p",
        null,
        "The following questions are all optional. All feedback, both positive and negative, is appreciated. Providing feedback here will have no effect on your receiving payment for taking part in this study."
      )
    ),
    React.createElement(
      "button",
      {
        type: "text",
        className: "proceed-button",
        onClick: function onClick() {
          return handleDebrief();
        }
      },
      "Complete Study"
    )
  );
};