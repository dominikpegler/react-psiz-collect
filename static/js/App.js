var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var SERVER_URL = window.location.protocol + "//" + window.location.hostname + "/api";

var App = function App() {
  var _React$useState = React.useState(),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      workerId = _React$useState2[0],
      setWorkerId = _React$useState2[1];

  var _React$useState3 = React.useState(true),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      showWelcomeScreen = _React$useState4[0],
      setShowWelcomeScreen = _React$useState4[1];

  var _React$useState5 = React.useState(false),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      confirmed = _React$useState6[0],
      setConfirmed = _React$useState6[1];

  var _React$useState7 = React.useState(),
      _React$useState8 = _slicedToArray(_React$useState7, 2),
      surveyComplete = _React$useState8[0],
      setSurveyComplete = _React$useState8[1];

  var _React$useState9 = React.useState(),
      _React$useState10 = _slicedToArray(_React$useState9, 2),
      consent = _React$useState10[0],
      setConsent = _React$useState10[1];

  var _React$useState11 = React.useState(""),
      _React$useState12 = _slicedToArray(_React$useState11, 2),
      strategy = _React$useState12[0],
      setStrategy = _React$useState12[1];

  var _React$useState13 = React.useState(false),
      _React$useState14 = _slicedToArray(_React$useState13, 2),
      backendConnected = _React$useState14[0],
      setBackendConnected = _React$useState14[1];

  var protocolId = "internal";

  var _React$useState15 = React.useState(new Date()),
      _React$useState16 = _slicedToArray(_React$useState15, 2),
      beginHit = _React$useState16[0],
      _ = _React$useState16[1];

  var _React$useState17 = React.useState(),
      _React$useState18 = _slicedToArray(_React$useState17, 2),
      assignmentId = _React$useState18[0],
      setAssignmentId = _React$useState18[1];

  var _React$useState19 = React.useState(2),
      _React$useState20 = _slicedToArray(_React$useState19, 2),
      statusCode = _React$useState20[0],
      setStatusCode = _React$useState20[1];

  var _React$useState21 = React.useState(0),
      _React$useState22 = _slicedToArray(_React$useState21, 2),
      trials = _React$useState22[0],
      setTrials = _React$useState22[1];

  var _React$useState23 = React.useState(),
      _React$useState24 = _slicedToArray(_React$useState23, 2),
      survey = _React$useState24[0],
      setSurvey = _React$useState24[1];

  var _React$useState25 = React.useState(),
      _React$useState26 = _slicedToArray(_React$useState25, 2),
      pages = _React$useState26[0],
      setPages = _React$useState26[1];

  var _React$useState27 = React.useState(),
      _React$useState28 = _slicedToArray(_React$useState27, 2),
      selection = _React$useState28[0],
      setSelection = _React$useState28[1];

  var handleSubmit = function handleSubmit(e) {
    if (e.key == "Enter") {
      setWorkerId(e.target.value);
    }
  };

  var testConnection = function testConnection() {
    fetch(SERVER_URL + "/test-backend-connection/").then(function (response) {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(function () {
      setBackendConnected(true);
    }).catch(function (err) {
      console.log("Connection with backend failed.");
      console.log("ERROR-Response from API:", err.toString());
    });
  };

  var handleAssigned = function handleAssigned(assignment) {
    fetch(SERVER_URL + "/create-assignment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(assignment)
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(function (res) {
      console.log("res", res);
      setAssignmentId(res.assignment_id);
      setTrials(res.trials_completed);
      setConsent(res.consent);
      setSurveyComplete(res.survey_complete);
      setStrategy(res.strategy);
      console.log("Success: Worker " + workerId + " started assignment " + res.assignment_id + ".");
    }).catch(function (err) {
      console.log("ERROR-Response from API:", err.toString());
    });
  };

  var handleConfirmed = function handleConfirmed() {
    setConfirmed(true);
  };

  var handleConsent = function handleConsent() {
    setConsent(true);
    var assignmentUpdate = {
      assignment_id: assignmentId,
      end_hit: new Date(),
      status_code: statusCode,
      consent: true,
      survey_complete: surveyComplete,
      strategy: ""
    };
    updateDatabase(assignmentUpdate);
  };

  var handleSurveyComplete = function handleSurveyComplete(selection) {
    setSurveyComplete(true);
    console.log("Survey completed. Selection\n", selection);
    var assignmentUpdate = {
      assignment_id: assignmentId,
      end_hit: new Date(),
      status_code: statusCode,
      consent: consent,
      survey_complete: true,
      strategy: ""
    };
    updateDatabase(assignmentUpdate);
    uploadSurveyData(assignmentId, selection);
  };

  var downloadSurveyData = function downloadSurveyData(ITEMS_PER_PAGE) {
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

  var uploadSurveyData = function uploadSurveyData(assignmentId, selection) {
    console.log("trying to upload this survey data -->", JSON.stringify({
      assignment_id: assignmentId,
      project_id: projectId,
      selection: selection
    }));
    fetch(SERVER_URL + "/send-survey-responses-by-assignment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        assignment_id: assignmentId,
        project_id: projectId,
        selection: selection
      })
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(function (res) {
      console.log("Upload of survey data for assignment " + res.assignment_id + " and project " + res.project_id + " successful.");
      console.log("This is the whole menu -->", res.survey_data);
    }).catch(function (err) {
      console.log("Error:", err.toString());
    });
  };

  var updateDatabase = function updateDatabase(assignmentUpdate) {
    fetch(SERVER_URL + "/update-assignment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(assignmentUpdate)
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(function (res) {
      console.log("Assignment " + res.assignment_id + " update successful.");
    }).catch(function (err) {
      console.log("ERROR-Response from API:", err.toString());
    });
  };

  var inputRef = React.useRef();

  React.useLayoutEffect(function () {
    document.documentElement.requestFullscreen();
  });

  // runs only once at the beginning to set focus on text input
  // and set workerId from url params
  React.useEffect(function () {
    console.log("Effect, if runs 2x at startup that's fine :)");
    if (typeof PROLIFIC_PID !== "undefined") {
      setWorkerId(PROLIFIC_PID);
    } else if (backendConnected) {
      inputRef.current.focus();
    }
    testConnection();
  }, [inputRef, backendConnected]);

  // runs only if workerId was changed
  React.useEffect(function () {
    if (workerId !== undefined) {
      var assignment = {
        assignment_id: assignmentId,
        project_id: projectId,
        protocol_id: protocolId,
        worker_id: workerId,
        amt_assignment_id: "", // unclear
        amt_hit_id: "", // unclear
        browser: navigator.userAgent, // extract from string
        platform: navigator.userAgent, // extract from string
        begin_hit: beginHit,
        end_hit: beginHit, // will be updated later after each trial
        status_code: 0, // will be updated after trials
        ver: 2,
        consent: 0,
        survey_complete: 0,
        strategy: strategy
      };
      handleAssigned(assignment);
    }
  }, [workerId]);

  return backendConnected ? workerId ? showWelcomeScreen ? React.createElement(Welcome, { setShowWelcomeScreen: setShowWelcomeScreen }) : consent ? surveyComplete ? confirmed ? React.createElement(Experiment, {
    assignmentId: assignmentId,
    statusCode: statusCode,
    setStatusCode: setStatusCode,
    consent: consent,
    surveyComplete: surveyComplete,
    trials: trials,
    setTrials: setTrials,
    strategy: strategy,
    setStrategy: setStrategy
  }) : React.createElement(Instructions, { handleConfirmed: handleConfirmed }) : surveyComplete == false && React.createElement(Survey, {
    survey: survey,
    handleSurveyComplete: handleSurveyComplete,
    downloadSurveyData: downloadSurveyData,
    pages: pages,
    selection: selection,
    setSelection: setSelection
  }) : consent == false && React.createElement(Consent, { handleConsent: handleConsent }) : React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "div",
      { className: "welcome" },
      React.createElement(
        "div",
        { className: "login" },
        React.createElement(
          "span",
          null,
          "Please enter your participant ID"
        ),
        React.createElement("input", {
          type: "text",
          className: "login-input",
          onKeyDown: function onKeyDown(e) {
            return handleSubmit(e);
          },
          ref: inputRef
        })
      )
    )
  ) : React.createElement("div", { className: "container" });
};

var domContainer = document.querySelector("#react-container");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(App, null));