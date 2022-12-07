"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Survey = function Survey(_ref) {
  var handleSurveyComplete = _ref.handleSurveyComplete;

  {
    var _React$useState = React.useState(),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        survey = _React$useState2[0],
        setSurvey = _React$useState2[1];

    var _React$useState3 = React.useState(0),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        pageNo = _React$useState4[0],
        setPageNo = _React$useState4[1];

    var _React$useState5 = React.useState(),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        pages = _React$useState6[0],
        setPages = _React$useState6[1];

    var _React$useState7 = React.useState(),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        assignmentId = _React$useState8[0],
        setAssignmentId = _React$useState8[1];

    var _React$useState9 = React.useState(new Date()),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        beginHit = _React$useState10[0],
        _ = _React$useState10[1];

    var _React$useState11 = React.useState(new Date()),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        startMs = _React$useState12[0],
        setStartMs = _React$useState12[1];
    // fetch from API and update later on => set to 1 if all trials finished, set to 2 if ...


    var _React$useState13 = React.useState(2),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        statusCode = _React$useState14[0],
        setStatusCode = _React$useState14[1];

    var _React$useState15 = React.useState(),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        selection = _React$useState16[0],
        setSelection = _React$useState16[1];

    var _React$useState17 = React.useState(false),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        indicateMissing = _React$useState18[0],
        setIndicateMissing = _React$useState18[1];

    var _React$useState19 = React.useState({ display: "none" }),
        _React$useState20 = _slicedToArray(_React$useState19, 2),
        showOverlay = _React$useState20[0],
        setShowOverlay = _React$useState20[1];

    var ITEMS_PER_PAGE = 6;

    var handlePagination = function handlePagination(move) {
      if (pageNo + move >= 0 && pageNo + move < pages) {
        setPageNo(pageNo + move);
      } else if (pageNo + move >= pages) {
        if (Object.keys(survey[0]["items"]).length == Object.keys(selection).length) {
          handleSurveyComplete(selection); // TODO, call uploadSurveyData from here and put setSurveyFinished into this function
        } else {
          setShowOverlay({ display: "block" });
          setIndicateMissing(true);
        }
      } else if (pageNo + move < 0) {
        console.log("Nothing here. ");
        //setConsent(false);
      }
    };

    var uploadSurveyData = function uploadSurveyData(projectId) {
      // TODO put this into handleSurveyComplete in App.js
      fetch(SERVER_URL + "/send-surveys-responses-by-project-id/" + projectId, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      }).then(function (res) {
        setSurvey(res);
      }).catch(function (err) {
        console.log("Error:", err.toString());
      });
    };

    var downloadSurveyData = function downloadSurveyData(projectId) {
      fetch(SERVER_URL + "/get-surveys-by-project-id/" + projectId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }).then(function (response) {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      }).then(function (res) {
        setSurvey(res);
        setPages(Math.ceil(Object.keys(res[0]["items"]).length / ITEMS_PER_PAGE));
        setSelection({});
      }).catch(function (err) {
        console.log("Error:", err.toString());
      });
    };

    // runs only once at the beginning
    React.useEffect(function () {
      downloadSurveyData(projectId);
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
            "h1",
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
                    display: "block"
                  } : { display: "none" }
                },
                React.createElement(
                  "span",
                  null,
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
            { className: "bottom-tile", style: { justifyContent: "center" } },
            React.createElement(
              "div",
              { className: "submit-button-tile" },
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
              { className: "submit-button-tile" },
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

  var _React$useState21 = React.useState(""),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      value = _React$useState22[0],
      setValue = _React$useState22[1];

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
        alignItems: "flex-end",
        marginTop: "1rem",
        marginBottom: "2rem"
      }
    },
    s.scale && s.scale.map(function (likert) {
      return likert && React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column"
          }
        },
        React.createElement(
          "label",
          { "for": id + "-" + String(likert.value) },
          likert.label
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