"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Survey = function Survey(_ref) {
  var survey = _ref.survey,
      handleSurveyComplete = _ref.handleSurveyComplete,
      downloadSurveyData = _ref.downloadSurveyData,
      pages = _ref.pages,
      selection = _ref.selection,
      setSelection = _ref.setSelection;

  {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        pageNo = _React$useState2[0],
        setPageNo = _React$useState2[1];

    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        indicateMissing = _React$useState4[0],
        setIndicateMissing = _React$useState4[1];

    var _React$useState5 = React.useState({ display: "none" }),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        showOverlay = _React$useState6[0],
        setShowOverlay = _React$useState6[1];

    var ITEMS_PER_PAGE = 6;

    var handlePagination = function handlePagination(move) {
      if (pageNo + move >= 0 && pageNo + move < pages) {
        setPageNo(pageNo + move);
      } else if (pageNo + move >= pages) {
        if (Object.keys(survey[0]["items"]).length == Object.keys(selection).length) {
          handleSurveyComplete(selection); // TODO, call uploadSurveyData from here
        } else {
          setShowOverlay({ display: "block" });
          setIndicateMissing(true);
        }
      } else if (pageNo + move < 0) {
        console.log("Nothing here. ");
        //setConsent(false);
      }
    };

    // runs only once at the beginning
    React.useEffect(function () {
      downloadSurveyData(ITEMS_PER_PAGE);
    }, []);

    // rendering
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          {
            className: "overlay overlay-instructions",
            style: showOverlay,
            onClick: function onClick() {
              return setShowOverlay({ display: "none" });
            },
            onContextMenu: function onContextMenu() {
              return setZoom({ display: "none" });
            }
          },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "welcome" },
              React.createElement(
                "div",
                { className: "instructions" },
                React.createElement(
                  "div",
                  null,
                  "Please answer all questions. The missing answers are now marked in red."
                ),
                React.createElement(
                  "button",
                  {
                    type: "text",
                    className: "proceed-button proceed-button-info",
                    onClick: function onClick() {
                      return setShowOverlay({ display: "none" });
                    },
                    onContextMenu: function onContextMenu() {
                      return setShowOverlay({ display: "none" });
                    }
                  },
                  "OK"
                )
              )
            )
          )
        ),
        survey && React.createElement(
          "div",
          { className: "welcome" },
          React.createElement(
            "h2",
            null,
            survey[0]["name"]
          ),
          React.createElement(ProgressBarContainerSurvey, {
            nItems: Object.keys(survey[0]["items"]).length,
            nSelected: Object.keys(selection).length
          }),
          React.createElement(
            "div",
            { className: "container-questionnaire" },
            survey && Object.keys(survey[0]["items"]).map(function (key, idx) {
              return React.createElement(
                "div",
                {
                  style: idx >= pageNo * ITEMS_PER_PAGE && idx < pageNo * ITEMS_PER_PAGE + ITEMS_PER_PAGE ? {
                    display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem"
                  } : { display: "none" }
                },
                React.createElement(
                  "span",
                  { style: { marginRight: "2rem" } },
                  survey[0]["items"][key]
                ),
                React.createElement(ResponseBox, {
                  s: survey[0],
                  k: key,
                  setSelection: setSelection,
                  selection: selection,
                  indicateMissing: indicateMissing
                })
              );
            })
          ),
          React.createElement(
            "div",
            {
              className: "bottom-tile",
              style: { justifyContent: "center" }
            },
            React.createElement(
              "div",
              { className: "nav-button-tile" },
              React.createElement(
                "button",
                {
                  disabled: pageNo == 0,
                  onClick: function onClick() {
                    return handlePagination(-1);
                  }
                },
                "Back"
              )
            ),
            React.createElement(
              "div",
              { className: "nav-button-tile" },
              React.createElement(
                "button",
                { onClick: function onClick() {
                    return handlePagination(1);
                  } },
                "Next"
              )
            )
          )
        )
      )
    );
  }
};

var ResponseBox = function ResponseBox(_ref2) {
  var s = _ref2.s,
      k = _ref2.k,
      setSelection = _ref2.setSelection,
      selection = _ref2.selection,
      indicateMissing = _ref2.indicateMissing;

  var id = s["prefix"].concat("-", String(k));

  var _React$useState7 = React.useState(""),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      value = _React$useState8[0],
      setValue = _React$useState8[1];

  var handleChange = function handleChange(event) {
    setValue(event.target.value);
    var newSelection = selection;
    newSelection[k] = event.target.value;
    setSelection(newSelection);
  };

  return React.createElement(
    "form",
    {
      className: value == "" && indicateMissing && "response-box-missing",
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
      }
    },
    s.scale && s.scale.map(function (likert) {
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
          value: likert.value,
          onChange: handleChange
        })
      );
    })
  );
};

var handleSelection = function handleSelection(selection, setSelection, s, k, val) {
  var newSelection = selection;
  newSelection[s.prefix][k] = val;
  setSelection(newSelection);
};