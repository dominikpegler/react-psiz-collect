const SERVER_URL =
  window.location.protocol + "//" + window.location.hostname + "/api";

const App = () => {
  const [workerId, setWorkerId] = React.useState();
  const [confirmed, setConfirmed] = React.useState(false);
  const [surveyComplete, setSurveyComplete] = React.useState();
  const [consent, setConsent] = React.useState();
  const [backendConnected, setBackendConnected] = React.useState(false);
  const protocolId = "internal";
  const [beginHit, _] = React.useState(new Date());
  const [assignmentId, setAssignmentId] = React.useState();
  const [statusCode, setStatusCode] = React.useState(2);
      const [trials, setTrials] = React.useState(0);


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
            <div className={"container"}>
              <div className={"welcome"}>
                <div className={"instructions"}>
                  <Instructions />
                  <ImageContainerMini />
                  <button
                    type="text"
                    className={"proceed-button"}
                    onClick={() => handleConfirmed()}
                  >
                    Start
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          surveyComplete==false && <Survey handleSurveyComplete={handleSurveyComplete} />
        )
      ) : (
        consent==false && <div className={"container"}>
          <div className={"consent"}>
            <Consent />
            <button
              type="text"
              className={"proceed-button"}
              onClick={() => handleConsent()}
            >
              I agree to participate in the study and continue
            </button>
          </div>
        </div>
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
