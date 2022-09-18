"use strict";

const transitionTime = 100; // before images are loaded and spinner is shown.

const BaseContainer = () => {
  {
    const [trials, setTrials] = React.useState(0);
    const [imgsLoaded, setImgsLoaded] = React.useState(false);
    const [selection, setSelection] = React.useState([]);
    const [selectionTimes, setSelectionTimes] = React.useState([]);
    const [numberOfUpdates, setNumberOfUpdates] = React.useState(0);
    // numberOfUpdates is needed only because without it the child components (<Tile/>)
    // would not update. There might be a better solution.

    // TODO set to 1 if all trials finished, set to 2 if ...
    const [statusCode, setStatusCode] = React.useState(0);

    // TODO fetch the following in the future fetch from API
    const [stimulusSet, setStimulusSet] = React.useState(
      randomIntArray(0, 119, 9)
    );
    const assignmentId = 0;
    const nTrials = 40;
    const protocolId = "";
    const projectId = "rocks";
    const [beginHit, _] = React.useState(new Date());
    const [startMs, setStartMs] = React.useState(new Date());

    // TODO fetch from browser
    const workerId = ""; // through prolific link

    React.useEffect(() => {
      // this runs only once at the beginning of the assignment
      if (trials == 0) {
        // create entry in db at start of experiment
        console.log("New assignment:");

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
        };
        console.log(assignment); // TODO instead of console.log this will be posted to API
      }
    }, [trials]);

    const handleSubmit = () => {
      if (selection.length == 2) {
        const trialId = 279; // TODO: to be fetched from API in real time to avoid duplicates due to concurrent participants
        const submitTime = new Date() - startMs;
        setTrials(trials + 1);
        setImgsLoaded(false);
        setStimulusSet(randomIntArray(0, 119, 9));
        const computeChoiceSet = () => {
          const set = selection.map((el) => stimulusSet[el - 1]);
          return set.concat(stimulusSet.filter((i) => !set.includes(i)));
        };
        const choiceSet = computeChoiceSet();

        console.log("New trial submitted!");
        const trial = {
          trial_id: trialId,
          assignment_id: assignmentId,
          n_select: 2, // TODO: comes from API/protocol
          is_ranked: 1, //
          q_idx: stimulusSet[0],
          r1_idx: stimulusSet[1],
          r2_idx: stimulusSet[2],
          r3_idx: stimulusSet[3],
          r4_idx: stimulusSet[4],
          r5_idx: stimulusSet[5],
          r6_idx: stimulusSet[5],
          r7_idx: stimulusSet[7],
          r8_idx: stimulusSet[8],
          c1_idx: choiceSet[1],
          c2_idx: choiceSet[2],
          c3_idx: choiceSet[3],
          c4_idx: choiceSet[4],
          c5_idx: choiceSet[5],
          c6_idx: choiceSet[6],
          c7_idx: choiceSet[7],
          c8_idx: choiceSet[8],
          start_ms: startMs,
          c1_rt_ms: selectionTimes[0],
          c2_rt_ms: selectionTimes[1],
          c3_rt_ms: 0, // usually 0 with n_select = 2, altern. could write selectionTimes[2]
          c4_rt_ms: 0,
          c5_rt_ms: 0,
          c6_rt_ms: 0,
          c7_rt_ms: 0,
          c8_rt_ms: 0,
          submit_rt_ms: submitTime,
          is_catch_trial: 0, // TODO unclear
          rating: "", // TODO unclear
        };

        console.log(trial); // TODO instead of console.log this will be posted to API
        // reset some states
        setSelection([]);
        setSelectionTimes([]);
        setStartMs(new Date());

        console.log(`Assignment ${assignmentId} updated!`); // TODO instead of console.log update some fields in assignment table via API
      }
    };

    const handleSelect = (id) => {
      const time = new Date() - startMs;
      var selectionNew = selection;
      var selectionTimesNew = selectionTimes;
      if (selection.includes(id)) {
        selectionNew.splice(selection.indexOf(id), 1);
        selectionTimesNew.splice(selection.indexOf(id), 1);
      } else if (selectionNew.length < 2) {
        selectionNew.push(id);
        selectionTimesNew.push(time);
      }
      setSelection(selectionNew);
      setSelectionTimes(selectionTimesNew);
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
