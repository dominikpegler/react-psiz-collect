"use strict";

const nTrials = 40;
const transitionTime = 750; // before images are loaded and spinner is shown.

// Base container
const BaseContainer = () => {
  {
    const [trials, setTrials] = React.useState(0);
    const [stimulusSet, setStimulusSet] = React.useState(randomIntArray(0, 119, 9));
    const [imgsLoaded, setImgsLoaded] = React.useState(false);

    const onClickButton = () => {
      setTrials(trials + 1);
      setImgsLoaded(false);
      setStimulusSet(randomIntArray(0, 119, 9));
    };

    React.useEffect(() => {
      const loadImage = imgId => {
        return new Promise((resolve, reject) => {
          const loadImg = new Image()
          loadImg.src = imgPaths[imgId]
          console.log(imgPaths[imgId])
          loadImg.onload = () =>
            setTimeout(() => {
              resolve(imgPaths[imgId])
            }, transitionTime)

          loadImg.onerror = err => reject(err)
        })
      }

      Promise.all(stimulusSet.map(imgId => loadImage(imgId)))
        .then(() => setImgsLoaded(true))
        .catch(err => console.log("Failed to load images", err))
    }, [imgsLoaded])

    return (
      <div>
        {trials < nTrials ? (
          <div className={"container"}>
            <ProgressBar nTrials={nTrials} trials={trials} />
            <Instructions />
            <React.Suspense fallback={<ImageContainerLoader />}>
              <ImageContainer stimulusSet={stimulusSet} imgsLoaded={imgsLoaded} /></React.Suspense>
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
