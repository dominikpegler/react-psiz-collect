const SERVER_URL =
  window.location.protocol + "//" + window.location.hostname + "/api";

const App = () => {
  const [workerId, setWorkerId] = React.useState();
  const [showWelcomeScreen, setShowWelcomeScreen] = React.useState(true);
  const [confirmed, setConfirmed] = React.useState(false);
  const [surveyComplete, setSurveyComplete] = React.useState();
  const [consent, setConsent] = React.useState();
  const [debrief, setDebrief] = React.useState();
  const [backendConnected, setBackendConnected] = React.useState(false);
  const protocolId = "internal";
  const [beginHit, _] = React.useState(new Date());
  const [assignmentId, setAssignmentId] = React.useState();
  const [statusCode, setStatusCode] = React.useState(2);
  const [trials, setTrials] = React.useState(0);
  const [survey, setSurvey] = React.useState();
  const [pages, setPages] = React.useState();
  const [selection, setSelection] = React.useState();

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      setWorkerId(e.target.value);
    }
  };

  const testConnection = () => {
    fetch(SERVER_URL + "/test-backend-connection/")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setBackendConnected(true);
      })
      .catch((err) => {
        console.log("Connection with backend failed.");
        console.log("ERROR-Response from API:", err.toString());
      });
  };

  const handleAssigned = (assignment) => {
    fetch(SERVER_URL + "/create-assignment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignment),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        console.log("res", res);
        setAssignmentId(res.assignment_id);
        setTrials(res.trials_completed);
        setConsent(res.consent);
        setSurveyComplete(res.survey_complete);
        console.log(
          `Success: Worker ${workerId} started assignment ${res.assignment_id}.`
        );
      })
      .catch((err) => {
        console.log("ERROR-Response from API:", err.toString());
      });
  };

  const handleConfirmed = () => {
    setConfirmed(true);
  };

  const handleConsent = () => {
    setConsent(true);
    const assignmentUpdate = {
      assignment_id: assignmentId,
      end_hit: new Date(),
      status_code: statusCode,
      consent: true,
      survey_complete: surveyComplete,
    };
    updateDatabase(assignmentUpdate);
  };

  const handleSurveyComplete = (selection) => {
    setSurveyComplete(true);
    console.log("Survey completed. Selection\n", selection);
    const assignmentUpdate = {
      assignment_id: assignmentId,
      end_hit: new Date(),
      status_code: statusCode,
      consent: consent,
      survey_complete: true,
    };
    updateDatabase(assignmentUpdate);
    uploadSurveyData(assignmentId, selection);
  };

  const downloadSurveyData = (ITEMS_PER_PAGE) => {
    fetch(SERVER_URL + "/get-surveys-by-project-id/" + projectId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        setSurvey(res);
        setPages(
          Math.ceil(Object.keys(res[0]["items"]).length / ITEMS_PER_PAGE)
        );
        setSelection({});
      })
      .catch((err) => {
        console.log("Error:", err.toString());
      });
  };

  const uploadSurveyData = (assignmentId, selection) => {
    console.log(
      "trying to upload this survey data -->",
      JSON.stringify({
        assignment_id: assignmentId,
        project_id: projectId,
        selection: selection,
      })
    );
    fetch(SERVER_URL + "/send-survey-responses-by-assignment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assignment_id: assignmentId,
        project_id: projectId,
        selection: selection,
      }),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        console.log(
          `Upload of survey data for assignment ${res.assignment_id} and project ${res.project_id} successful.`
        );
        console.log("This is the whole menu -->", res.survey_data);
      })
      .catch((err) => {
        console.log("Error:", err.toString());
      });
  };

  const updateDatabase = (assignmentUpdate) => {
    fetch(SERVER_URL + "/update-assignment/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assignmentUpdate),
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((res) => {
        console.log(`Assignment ${res.assignment_id} update successful.`);
      })
      .catch((err) => {
        console.log("ERROR-Response from API:", err.toString());
      });
  };

  const inputRef = React.useRef();

  React.useLayoutEffect(() => {
    document.documentElement.requestFullscreen();
  });

  // runs only once at the beginning to set focus on text input
  // and set workerId from url params
  React.useEffect(() => {
    console.log("Effect, if runs 2x at startup that's fine :)");
    if (typeof PROLIFIC_PID !== "undefined") {
      setWorkerId(PROLIFIC_PID);
    } else if (backendConnected) {
      inputRef.current.focus();
    }
    testConnection();
  }, [inputRef, backendConnected]);

  // runs only if workerId was changed
  React.useEffect(() => {
    if (workerId !== undefined) {
      const assignment = {
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
      };
      handleAssigned(assignment);
    }
  }, [workerId]);

  return backendConnected ? (
    workerId ? (
      showWelcomeScreen ? (<Welcome setShowWelcomeScreen={setShowWelcomeScreen}/>) : 
      consent ? (
        surveyComplete ? (
          confirmed ? (
            <Experiment
              assignmentId={assignmentId}
              statusCode={statusCode}
              setStatusCode={setStatusCode}
              consent={consent}
              surveyComplete={surveyComplete}
              trials={trials}
              setTrials={setTrials}
            />
          ) : (
            <Instructions handleConfirmed={handleConfirmed} />
          )
        ) : (
          surveyComplete == false && (
            <Survey
              survey={survey}
              handleSurveyComplete={handleSurveyComplete}
              downloadSurveyData={downloadSurveyData}
              pages={pages}
              selection={selection}
              setSelection={setSelection}
            />
          )
        )
      ) : (
        consent == false && <Consent handleConsent={handleConsent} />
      )
    ) : (
      <div className={"container"}>
        <div className={"welcome"}>
          <div className={"login"}>
            <span>Please enter your participant ID</span>
            <input
              type="text"
              className={"login-input"}
              onKeyDown={(e) => handleSubmit(e)}
              ref={inputRef}
            ></input>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className={"container"}></div>
  );
};

const domContainer = document.querySelector("#react-container");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);
