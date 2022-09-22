"use strict";

const Experiment = ({ workerId }) => {
  {
    const [trials, setTrials] = React.useState(0);
    const [imgsLoaded, setImgsLoaded] = React.useState(false);
    const [selection, setSelection] = React.useState([]);
    const [selectionTimes, setSelectionTimes] = React.useState([]);
    const [numberOfUpdates, setNumberOfUpdates] = React.useState(0);
    const [assignmentId, setAssignmentId] = React.useState();

    // numberOfUpdates is needed only because without it the child components (<Tile/>)
    // would not update. There might be a better solution.

    const transitionTime = 100; // before images are loaded and spinner is shown.

    // TODO fetch the following in the future fetch from API
    const [stimulusSet, setStimulusSet] = React.useState(
      randomIntArray(0, imgPaths.length - 1, 9)
    );
    const nTrials = 40;
    const protocolId = "internal";
    const projectId = "roast"; // should come from link
    const [beginHit, _] = React.useState(new Date());
    const [startMs, setStartMs] = React.useState(new Date());
    // fetch from API and update later on => set to 1 if all trials finished, set to 2 if ...
    const [statusCode, setStatusCode] = React.useState(2);

    const handleAssigned = (assignment) => {
      fetch("http://localhost:5000/create-assignment/", {
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
          console.log(
            `Success: Worker ${workerId} started assignment ${res.assignment_id}.`
          );
        })
        .catch((err) => {
          console.log("Error:", err.toString());
        });
    };

    const handleSubmit = () => {
      if (selection.length == 2) {
        const endHit = new Date();
        const submitTime = endHit - startMs;
        var newStatusCode = statusCode;
        if (trials == 0) {
          newStatusCode = 2;
          setStatusCode(newStatusCode);
        } else if (trials == nTrials) {
          newStatusCode = 1;
          setStatusCode(newStatusCode);
        }

        setTrials(trials + 1);
        setImgsLoaded(false);
        setStimulusSet(randomIntArray(0, 119, 9));
        const computeChoiceSet = () => {
          const set = selection.map((el) => stimulusSet[el - 1]);
          return set.concat(stimulusSet.filter((i) => !set.includes(i)));
        };
        const choiceSet = computeChoiceSet();

        const trial = {
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
        fetch("http://localhost:5000/create-trial/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(trial),
        })
          .then((response) => {
            if (response.status !== 200) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .then((res) => {
            console.log(`Trial ${res.trial_id} submission successful.`);
          })
          .catch((err) => {
            console.log("Error:", err.toString());
          });

        console.log(`Updated assignment ${assignmentId}:`); // TODO instead of console.log update some fields in assignment table via AP
        const assignmentUpdate = {
          assignment_id: assignmentId,
          end_hit: endHit,
          status_code: newStatusCode,
        };
        console.log(assignmentUpdate);
        fetch("http://localhost:5000/update-assignment/", {
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
            console.log("Error:", err.toString());
          });

        // reset some states for the next trail
        setSelection([]);
        setSelectionTimes([]);
        setStartMs(new Date());
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

    // runs once at the beginning of the assignment
    React.useEffect(() => {
      if (trials == 0) {
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
        handleAssigned(assignment);
      }
    }, [trials]);

    // runs once before each trial to preload the images
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
    }, [stimulusSet]);

    // rendering
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
          <div className={"container"}>
            <div className={"goodbye"}>
              <span>
                Thank you for your participation! You can now close this window.
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
};
