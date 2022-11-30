"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Survey = function Survey(_ref) {
  var workerId = _ref.workerId;

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

    var QUESTIONS_PP = 6;

    var handlePagination = function handlePagination(move) {
      if (pageNo + move >= 0 & pageNo + move < pages.length) {
        setPageNo(pageNo + move);
      } else {
        console.log("Won't do nothing.");
      }
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
      }).catch(function (err) {
        console.log("Error:", err.toString());
      });
    };

    // runs only once at the beginning
    React.useEffect(function () {
      downloadSurveyData(projectId);
    }, []);

    // runs when survey data changes
    React.useEffect(function () {
      if (survey !== undefined) {
        var i = 0;
        var j = void 0;
        var nItems = 0;
        var nPages = void 0;
        var len = survey.length;
        var pagesTmp = [];
        for (; i < len;) {
          nItems = survey[i]["items"].length;
          nPages = Math.ceil(nItems / QUESTIONS_PP);
          j = 0;
          for (; j < nPages;) {
            pagesTmp.push([i, QUESTIONS_PP * j]);
            j++;
          }
          i++;
        }
        setPages(pagesTmp);
      }
    }, [survey]);

    // rendering
    return React.createElement(
      "div",
      null,
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "h1",
          null,
          pages && survey[pages[pageNo][0]]["name"]
        ),
        React.createElement(
          "div",
          null,
          pages && survey[pages[pageNo][0]]["items"].slice(pages[pageNo][1], pages[pageNo][1] + QUESTIONS_PP).map(function (item) {
            return React.createElement(
              "div",
              null,
              React.createElement(
                "span",
                null,
                item
              ),
              React.createElement(ResponseBox, {
                s: survey[pages[pageNo][0]],
                item: item
              })
            );
          }),
          1 + pageNo,
          "/",
          pages && pages.length
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
                disabled: pageNo === 0,
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
              {
                disabled: pages && pageNo == pages.length - 1,
                onClick: function onClick() {
                  return handlePagination(1);
                }
              },
              "Next"
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