"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Survey = function Survey(_ref) {
  var workerId = _ref.workerId;

  {
    var _React$useState = React.useState([]),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        survey = _React$useState2[0],
        setSurvey = _React$useState2[1];

    var _React$useState3 = React.useState(),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        assignmentId = _React$useState4[0],
        setAssignmentId = _React$useState4[1];

    var _React$useState5 = React.useState(new Date()),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        beginHit = _React$useState6[0],
        _ = _React$useState6[1];

    var _React$useState7 = React.useState(new Date()),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        startMs = _React$useState8[0],
        setStartMs = _React$useState8[1];
    // fetch from API and update later on => set to 1 if all trials finished, set to 2 if ...


    var _React$useState9 = React.useState(2),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        statusCode = _React$useState10[0],
        setStatusCode = _React$useState10[1];

    var _React$useState11 = React.useState(),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        selection = _React$useState12[0],
        setSelection = _React$useState12[1];

    var QUESTIONS_PP = 6;

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
      }).catch(function (err) {
        console.log("Error:", err.toString());
      });
    };

    // runs once at the beginning of the assignment
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
          null,
          survey && survey.map(function (s) {
            return s && React.createElement(
              "div",
              null,
              React.createElement(
                "h1",
                null,
                s.name
              ),
              s.items && s.items.map(function (item) {
                return item && React.createElement(
                  "div",
                  null,
                  React.createElement(
                    "span",
                    null,
                    item
                  ),
                  React.createElement(ResponseBox, { s: s, item: item })
                );
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
              { onClick: function onClick(e) {
                  return handleClick(e);
                } },
              "Proceed"
            )
          )
        )
      )
    );
  }
};

var ResponseBox = function ResponseBox(_ref2) {
  var s = _ref2.s,
      item = _ref2.item;

  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: "1rem",
        marginBottom: "3rem"
      }
    },
    s.scale.map(function (likert) {
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
          { "for": item + String(likert.value) },
          likert.label
        ),
        React.createElement("input", {
          type: "radio",
          id: item + String(likert.value),
          name: item,
          value: likert.value,
          style: { cursor: "pointer" }
        })
      );
    })
  );
};