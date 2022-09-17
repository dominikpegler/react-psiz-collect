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
        // TODO
        // The following fields have to be send to the back-end
        // for storage in the database.
        // ------------------------------------------
        // Fields for table "assignment"  (with example entry):
        // assignment_id                       2962
        // project_id                         rocks
        // protocol_id              protocol_0.json
        // worker_id                             dp
        // amt_assignment_id
        // amt_hit_id
        // browser                          Firefox
        // platform                    Linux x86_64
        // begin_hit            2022-09-17 12:13:50
        // end_hit              2022-09-17 12:13:50
        // status_code                            0
        // ver                                    2
        // ------------------------------------------
        // Fields for table "trial" (with example entry):
        // trial_id                         3088
        // assignment_id                    2956
        // n_select                            2
        // is_ranked                           1
        // q_idx                              72
        // r1_idx                            311
        // r2_idx                             88
        // r3_idx                            209
        // r4_idx                            181
        // r5_idx                            242
        // r6_idx                            259
        // r7_idx                            134
        // r8_idx                            191
        // c1_idx                            242
        // c2_idx                            191
        // c3_idx                            311
        // c4_idx                             88
        // c5_idx                            209
        // c6_idx                            181
        // c7_idx                            259
        // c8_idx                            134
        // start_ms          2022-09-12 12:27:49
        // c1_rt_ms                          414
        // c2_rt_ms                          894
        // c3_rt_ms                            0
        // c4_rt_ms                            0
        // c5_rt_ms                            0
        // c6_rt_ms                            0
        // c7_rt_ms                            0
        // c8_rt_ms                            0
        // submit_rt_ms                     1406
        // is_catch_trial                      0
        // rating                           None
        // -----------------------------------------

        setTrials(trials + 1);
        setImgsLoaded(false);
        setStimulusSet(randomIntArray(0, 119, 9));
        const computeChoiceSet = () => {
          const set = selection.map((el) => stimulusSet[el - 1]);
          return set.concat(stimulusSet.filter((i) => !set.includes(i)));
        };
        const choiceSet = computeChoiceSet();
        console.log("stimulusSet:", stimulusSet);
        console.log("choiceSet:", choiceSet);
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
            <ProgressBarContainer nTrials={nTrials} trials={trials} />
            <Prompt />
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
