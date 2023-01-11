var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Debrief = function Debrief(_ref) {
  var handleDebrief = _ref.handleDebrief;

  var textInput = React.useRef();
  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "debrief" },
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
      ),
      React.createElement("hr", null)
    ),
    React.createElement(
      "div",
      { className: "container-debrief-questionnaire" },
      React.createElement(
        "div",
        {
          className: "debrief-question"
        },
        React.createElement(
          "span",
          { style: { marginRight: "2rem" } },
          "How did you enjoy taking part in this study?"
        ),
        React.createElement(ResponseBoxDebrief, {
          scale: [{ "value": 1, "label": "Low" }, { "value": 2, "label": "" }, { "value": 3, "label": "" }, { "value": 4, "label": "" }, { "value": 5, "label": "High" }],
          key: "question_1"
          // setSelection={setSelection}
          // selection={selection}
        })
      ),
      React.createElement(
        "div",
        {
          className: "debrief-question"
        },
        React.createElement(
          "span",
          { style: { marginRight: "2rem" } },
          "How interesting did you find this study?"
        ),
        React.createElement(ResponseBoxDebrief, {
          scale: [{ "value": 1, "label": "Boring" }, { "value": 2, "label": "" }, { "value": 3, "label": "" }, { "value": 4, "label": "" }, { "value": 5, "label": "Interesting" }],
          key: "question_2"
          // setSelection={setSelection}
          // selection={selection}
        })
      ),
      React.createElement(
        "div",
        {
          className: "debrief-question"
        },
        React.createElement(
          "span",
          { style: { marginRight: "2rem" } },
          "How well were the study instructions explained?"
        ),
        React.createElement(ResponseBoxDebrief, {
          scale: [{ "value": 1, "label": "Not very well" }, { "value": 2, "label": "" }, { "value": 3, "label": "" }, { "value": 4, "label": "" }, { "value": 5, "label": "Very well" }],
          key: "question_3"
          // setSelection={setSelection}
          // selection={selection}
        })
      ),
      React.createElement(
        "div",
        {
          className: "debrief-question"
        },
        React.createElement(
          "span",
          { style: { marginRight: "2rem" } },
          "What is your opinion on the length of the study?"
        ),
        React.createElement(ResponseBoxDebrief, {
          scale: [{ "value": 1, "label": "Too short" }, { "value": 2, "label": "" }, { "value": 3, "label": "" }, { "value": 4, "label": "" }, { "value": 5, "label": "Too long" }],
          key: "question_4"
          // setSelection={setSelection}
          // selection={selection}
        })
      ),
      React.createElement(
        "div",
        {
          className: "debrief-question"
        },
        React.createElement(
          "span",
          { style: { marginRight: "2rem" } },
          "How much attention did you pay to the experiment (your response won't come with any disadvantages)?"
        ),
        React.createElement(ResponseBoxDebrief, {
          scale: [{ "value": 1, "label": "No attention" }, { "value": 2, "label": "" }, { "value": 3, "label": "" }, { "value": 4, "label": "" }, { "value": 5, "label": "Full attention" }],
          key: "question_5"
          // setSelection={setSelection}
          // selection={selection}
        })
      ),
      React.createElement(
        "div",
        {
          style: { display: "flex", flexDirection: "column" },
          className: "debrief-question"
        },
        " ",
        React.createElement(
          "span",
          { style: { marginRight: "2rem" } },
          "Do you have any comments about the study?"
        ),
        React.createElement("textarea", { autofocus: true, ref: textInput, style: { width: "60%", height: "100px" } })
      )
    ),
    React.createElement(
      "button",
      {
        type: "text",
        className: "proceed-button",
        onClick: function onClick() {
          return handleDebrief(textInput);
        }
      },
      "Complete Study"
    )
  );
};

var ResponseBoxDebrief = function ResponseBoxDebrief(_ref2) {
  var scale = _ref2.scale,
      key = _ref2.key;

  var id = "debrief".concat("-", String(key));

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      value = _React$useState2[0],
      setValue = _React$useState2[1];

  //const handleChange = (event) => {
  //  setValue(event.target.value);
  //  let newSelection = selection;
  //  newSelection[k] = event.target.value;
  //  setSelection(newSelection);
  //};

  return React.createElement(
    "form",
    {
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        fontSize: "small"
      }
    },
    scale && scale.map(function (likert) {
      return likert && React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center",
            width: "4.7rem"
          }
        },
        React.createElement(
          "label",
          {
            "for": id + "-" + String(likert.value),
            style: { textAlign: "center", cursor: "pointer" }
          },
          likert.label,
          React.createElement("br", null),
          likert.value
        ),
        React.createElement("input", {
          className: "radio",
          type: "radio",
          checked: value == likert.value,
          id: id + "-" + String(likert.value),
          value: likert.value
          // onChange={handleChange}
        })
      );
    })
  );
};