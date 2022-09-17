"use strict";

const nTrials = 40;
const transitionTime = 100; // before images are loaded and spinner is shown.

// Base container
const BaseContainer = () => {
  {
    const [trials, setTrials] = React.useState(0);
    const [stimulusSet, setStimulusSet] = React.useState(
      randomIntArray(0, 119, 9)
    );
    const [imgsLoaded, setImgsLoaded] = React.useState(false);
    const [selection, setSelection] = React.useState([]);
    const [numberOfUpdates, setNumberOfUpdates] = React.useState(0);
    // numberOfUpdates is needed only because without it the child components (<Tile/>)
    // would not update. maybe there is a better solution.

    const handleSubmit = () => {
      if (selection.length == 2) {
        setTrials(trials + 1);
        setImgsLoaded(false);
        setStimulusSet(randomIntArray(0, 119, 9));
        console.log("stimulusSet:", stimulusSet);
        console.log(
          "selection:",
          selection.map((el) => stimulusSet[el - 1])
        );
        console.log("submitted!");
        setSelection([]);
      }
    };

    const handleSelect = (id) => {
      var selectionNew = selection;
      if (selection.includes(id)) {
        selectionNew.splice(selection.indexOf(id), 1);
      } else if (selectionNew.length < 2) {
        selectionNew.push(id);
      }
      setSelection(selectionNew);
      setNumberOfUpdates(numberOfUpdates + 1);
    };

    React.useEffect(() => {
      const loadImage = (imgId) => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image();
          loadImg.src = imgPaths[imgId];
          loadImg.onload = () =>
            setTimeout(() => {
              resolve(imgPaths[imgId]);
            }, transitionTime);

          loadImg.onerror = (err) => reject(err);
        });
      };

      Promise.all(stimulusSet.map((imgId) => loadImage(imgId)))
        .then(() => setImgsLoaded(true))
        .catch((err) => console.log("Failed to load images", err));
    }, [imgsLoaded]);

    return (
      <div>
        {trials < nTrials ? (
          <div className={"container"}>
            <ProgressBar nTrials={nTrials} trials={trials} />
            <Instructions />
            <React.Suspense fallback={<ImageContainerLoader />}>
              <ImageContainer
                stimulusSet={stimulusSet}
                imgsLoaded={imgsLoaded}
                selection={selection}
                handleSelect={handleSelect}
              />
            </React.Suspense>
            <div className={"submit-button-tile"}>
              <SubmitButton
                handleSubmit={() => handleSubmit()}
                selection={selection}
              />
            </div>
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
