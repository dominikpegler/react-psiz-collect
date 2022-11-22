const SERVER_URL = "http://psycyb-portia.psy.univie.ac.at:5000";

const App = () => {
  const [workerId, setWorkerId] = React.useState();
  const [confirmed, setConfirmed] = React.useState(false);
  const [backendConnected, setBackendConnected] = React.useState(false);

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      setWorkerId(e.target.value);
    }
  };

 // TODO USE A BUNDLER! NO MORE CDNs
 // also check if the solid app has some calls to non-public ports (only visible inside the docker network). if yes, check how it was done there
const handleFetchData = async () => {
  const response = await fetch(SERVER_URL + "/test-backend-connection/", {
    mode: "cors",
  });
  const data = await response.json();
  console.log(data);
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
        console.log("Error:", err.toString());
      });
  };

  const handleConfirmed = () => {
    setConfirmed(true);
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

  return backendConnected ? (
    workerId ? (
      confirmed ? (
        <Experiment workerId={workerId} />
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
