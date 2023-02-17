import "./App.css";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Instructions } from "./components/Instructions";
import { Welcome } from "./components/Welcome";
import { Survey } from "./components/Survey";
import { Consent } from "./components/Consent";
import { Experiment } from "./components/Experiment";

const SERVER_URL = "http://localhost:5000";

console.log(SERVER_URL);

function App() {
  const [workerId, setWorkerId] = useState();
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [surveyComplete, setSurveyComplete] = useState();
  const [consent, setConsent] = useState();
  const [strategy, setStrategy] = useState("");
  const [backendConnected, setBackendConnected] = useState(false);
  const protocolId = "internal";
  const [beginHit, _] = useState(new Date());
  const [assignmentId, setAssignmentId] = useState();
  const [statusCode, setStatusCode] = useState(2);
  const [trials, setTrials] = useState(0);
  const [survey, setSurvey] = useState();
  const [pages, setPages] = useState();
  const [selection, setSelection] = useState();
  const [projectId, setProjectId] = useState();

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
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
        setStrategy(res.strategy);
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
      strategy: "",
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
      strategy: "",
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

  const inputRef = useRef();

  // useLayoutEffect(() => {
  //   document.documentElement.requestFullscreen();
  // });

  // runs only once at the beginning to set focus on text input
  // and set workerId from url params
  useEffect(() => {
    function GetURLParameter(sParam) {
      var sPageURL = window.location.search.substring(1);
      var sURLVariables = sPageURL.split("&");
      for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split("=");
        if (sParameterName[0] === sParam) {
          return sParameterName[1];
        }
      }
    }
    setProjectId(GetURLParameter("project_id"));
    console.log("Effect, if runs 2x at startup that's fine :)");
    if (typeof GetURLParameter("PROLIFIC_PID") !== "undefined") {
      setWorkerId(GetURLParameter("PROLIFIC_PID"));
    } else if (backendConnected) {
      inputRef.current.focus();
    }
    testConnection();
    console.log("workerId", GetURLParameter("PROLIFIC_PID"));
    console.log("projectId", GetURLParameter("project_id"));
  }, [inputRef, backendConnected]);

  // runs only if workerId was changed
  useEffect(() => {
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
        strategy: strategy,
      };
      handleAssigned(assignment);
    }
  }, [workerId]);

  return backendConnected ? (
    workerId ? (
      showWelcomeScreen ? (
        <Welcome setShowWelcomeScreen={setShowWelcomeScreen} />
      ) : consent ? (
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
              strategy={strategy}
              setStrategy={setStrategy}
              SERVER_URL={SERVER_URL}
            />
          ) : (
            <Instructions handleConfirmed={handleConfirmed} />
          )
        ) : (
          surveyComplete === false && (
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
        consent === false && <Consent handleConsent={handleConsent} />
      )
    ) : (
      <div className={"root-container welcome login"}>
        <span>Please enter your participant ID</span>
        <input
          type="text"
          className={"login-input"}
          onKeyDown={(e) => handleSubmit(e)}
          ref={inputRef}
        ></input>
      </div>
    )
  ) : (
    <div className={"container"}></div>
  );
}

export default App;
