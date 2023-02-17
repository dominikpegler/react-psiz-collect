"use strict";
import React from "react";
import { randomIntArray } from "../functions/functions";
import { imgPaths } from "./imgPaths";
import { ProgressBarContainer } from "./ProgressBar";
import { InstructionsInner, Prompt } from "./Instructions";
import { ImageContainer, ImageContainerLoader } from "./ImageContainer";
import { SubmitButton } from "./Buttons";
import { Debrief } from "./Debrief";

const redirectURL =
  "https://app.prolific.co/researcher/submissions/complete?cc=CBVHYLC7";

export const Experiment = ({
  assignmentId,
  statusCode,
  setStatusCode,
  consent,
  surveyComplete,
  trials,
  setTrials,
  strategy,
  setStrategy,
  SERVER_URL,
}) => {
  {
    const [imgsLoaded, setImgsLoaded] = React.useState(false);
    const [selection, setSelection] = React.useState([]);
    const [selectionTimes, setSelectionTimes] = React.useState([]);
    const [numberOfUpdates, setNumberOfUpdates] = React.useState(0);
    // numberOfUpdates is needed only because without it the child components (<Tile/>)
    // would not update. There might be a better solution.

    const transitionTime = 100; // before images are loaded and spinner is shown.

    // TODO fetch the following in the future fetch from API
    const [stimulusSet, setStimulusSet] = React.useState(
      randomIntArray(0, imgPaths.length - 1, 9)
    );
    const nTrials = 40;
    const [startMs, setStartMs] = React.useState(new Date());
    // fetch from API and update later on => set to 1 if all trials finished, set to 2 if ...
    const [showOverlay, setShowOverlay] = React.useState({ display: "none" });
    const [zoom, setZoom] = React.useState({ display: "none", imgPath: "" });

    const handleDebrief = (textInput) => {
      console.log("Debrief finished");
      window.location.href = redirectURL;
    };

    const handleSubmitLastQuestion = (input) => {
      const endHit = new Date();
      const newStatusCode = 1;
      setStrategy(input);
      setStatusCode(newStatusCode);
      const assignmentUpdate = {
        assignment_id: assignmentId,
        end_hit: endHit,
        status_code: newStatusCode,
        consent: consent,
        survey_complete: surveyComplete,
        strategy: input,
      };

      // TODO we need this update thing twice at least, maybe better putting it into a function
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
          console.log("Error:", err.toString());
        });
    };

    const handleSubmitTrial = () => {
      if (selection.length === 2) {
        const endHit = new Date();
        const submitTime = endHit - startMs;
        var newStatusCode = statusCode;
        if (trials === 0) {
          newStatusCode = 2;
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
        fetch(SERVER_URL + "/create-trial/", {
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

        const assignmentUpdate = {
          assignment_id: assignmentId,
          end_hit: endHit,
          status_code: newStatusCode,
          consent: consent,
          survey_complete: surveyComplete,
          strategy: "",
        };

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
            console.log("Error:", err.toString());
          });

        // reset some states for the next trail
        setSelection([]);
        setSelectionTimes([]);
        setStartMs(new Date());
      }
    };

    const handleZoom = (e, imgPath, show) => {
      e.preventDefault();
      if (show === true) {
        setZoom({ display: "block", imgPath: imgPath });
      } else {
        setZoom({ display: "none", imgPath: imgPath });
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
      <div className={"root-container"}>
        {trials < nTrials ? (
          <div className={"experiment-container"}>
            <div
              className={"overlay overlay-instructions"}
              style={showOverlay}
              onClick={() => setShowOverlay({ display: "none" })}
              onContextMenu={() => setZoom({ display: "none" })}
            >
              <div className={"container"}>
                <div className={"welcome"}>
                  <div className={"instructions"}>
                    <InstructionsInner />
                    <button
                      type="text"
                      className={"proceed-button proceed-button-info"}
                      onClick={() => setShowOverlay({ display: "none" })}
                      onContextMenu={() => setZoom({ display: "none" })}
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={"overlay overlay-instructions"}
              style={zoom}
              onClick={(e) => handleZoom(e, "", false)}
              onContextMenu={(e) => handleZoom(e, "", false)}
            >
              <div className={"container zoomed-img"}>
                <img
                  src={zoom["imgPath"]}
                  alt="zoomed-image"
                  onClick={(e) => handleZoom(e, "", false)}
                  onContextMenu={(e) => handleZoom(e, "", false)}
                />
              </div>
            </div>
            <ProgressBarContainer nTrials={nTrials} trials={trials} />
            <Prompt />
            <React.Suspense fallback={<ImageContainerLoader />}>
              <ImageContainer
                stimulusSet={stimulusSet}
                imgsLoaded={imgsLoaded}
                selection={selection}
                handleSelect={handleSelect}
                handleZoom={handleZoom}
              />
            </React.Suspense>
            <div className={"bottom-tile"}>
              <div className={"info-button-tile"}>
                <button
                  className={"info-button"}
                  onClick={() => setShowOverlay({ display: "block" })}
                >
                  ?
                </button>
              </div>
              <div className={"submit-button-tile"}>
                <SubmitButton
                  handleSubmit={() => handleSubmitTrial()}
                  selection={selection}
                />
              </div>
              <div className={"info-button-tile"}></div>
            </div>
          </div>
        ) : strategy === "" ? (
          <div className={"container"}>
            <div className={"goodbye"}>
              <StrategyQuestion
                handleSubmitLastQuestion={handleSubmitLastQuestion}
              />
            </div>
          </div>
        ) : (
          <div className={"experiment-container"}>
            <Debrief handleDebrief={handleDebrief} />
          </div>
        )}
      </div>
    );
  }
};

const StrategyQuestion = ({ handleSubmitLastQuestion }) => {
  const textInput = React.useRef();
  return (
    <div className={"please-answer"}>
      <h3 style={{ textAlign: "center" }}>
        Could you describe what principles or strategies you used to choose the
        most similar images?
      </h3>
      <textarea autofocus ref={textInput} />
      <button
        type="text"
        className={"proceed-button"}
        onClick={() => handleSubmitLastQuestion(textInput.current.value)}
      >
        Submit Answer
      </button>
    </div>
  );
};
