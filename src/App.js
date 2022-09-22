"use strict";

const App = () => {
  const [workerId, setWorkerId] = React.useState(); // TODO: through prolific link

  const handleSubmit = (e) => {
    if (e.key == "Enter") {
      setWorkerId(e.target.value);
    }
  };

  return workerId ? (
    <Experiment workerId={workerId} />
  ) : (
    <div className={"container"}>
      <div className={"welcome"}>
        <div className={"login"}>
          <span>Please enter your participant ID</span>
          <input
            className={"login-input"}
            onKeyDown={(e) => handleSubmit(e)}
          ></input>
        </div>
      </div>
    </div>
  );
};

const domContainer = document.querySelector("#react-container");
const root = ReactDOM.createRoot(domContainer);
root.render(<App />);
