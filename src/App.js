"use strict";

// Base container
const BaseContainer = () => {
  {
    const [buttonClicks, setButtonClicks] = React.useState(0);

    const onClickButton = () => {
      setButtonClicks(buttonClicks + 1);
    };

    return (
      <div className={"container"}>
        <ProgressBar />
        <Instructions />
        <ImageContainer />
        <Button1 onClickButton={() => onClickButton()} />
        <p>Button was clicked {buttonClicks} times</p>
      </div>
    );
  }
};

const domContainer = document.querySelector("#react-container");
const root = ReactDOM.createRoot(domContainer);
root.render(<BaseContainer />);
