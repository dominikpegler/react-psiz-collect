"use strict";

const nTrials = 40;

// Base container
const BaseContainer = () => {
  {
    const [trials, setTrials] = React.useState(0);

    const onClickButton = () => {
      setTrials(trials + 1);
    };

    return (
      <div>
        {trials < nTrials ? (
          <div className={"container"}>
            <ProgressBar nTrials={nTrials} trials={trials} />
            <Instructions />
            <ImageContainer />
            <Button1 onClickButton={() => onClickButton()} />
          </div>
        ) : (
          <div className={"container"}>Vielen Dank für die Teilnahme!</div>
        )}
      </div>
    );
  }
};

const domContainer = document.querySelector("#react-container");
const root = ReactDOM.createRoot(domContainer);
root.render(<BaseContainer />);
