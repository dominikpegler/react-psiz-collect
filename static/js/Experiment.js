"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var Experiment = function Experiment(_ref) {
  var workerId = _ref.workerId;

  {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        trials = _React$useState2[0],
        setTrials = _React$useState2[1];

    var _React$useState3 = React.useState(false),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        imgsLoaded = _React$useState4[0],
        setImgsLoaded = _React$useState4[1];

    var _React$useState5 = React.useState([]),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        selection = _React$useState6[0],
        setSelection = _React$useState6[1];

    var _React$useState7 = React.useState([]),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        selectionTimes = _React$useState8[0],
        setSelectionTimes = _React$useState8[1];

    var _React$useState9 = React.useState(0),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        numberOfUpdates = _React$useState10[0],
        setNumberOfUpdates = _React$useState10[1];

    var _React$useState11 = React.useState(),
        _React$useState12 = _slicedToArray(_React$useState11, 2),
        assignmentId = _React$useState12[0],
        setAssignmentId = _React$useState12[1];

    // numberOfUpdates is needed only because without it the child components (<Tile/>)
    // would not update. There might be a better solution.

    var transitionTime = 100; // before images are loaded and spinner is shown.

    // TODO fetch the following in the future fetch from API

    var _React$useState13 = React.useState(randomIntArray(0, imgPaths.length - 1, 9)),
        _React$useState14 = _slicedToArray(_React$useState13, 2),
        stimulusSet = _React$useState14[0],
        setStimulusSet = _React$useState14[1];

    var nTrials = 40;
    var protocolId = "internal";

    var _React$useState15 = React.useState(new Date()),
        _React$useState16 = _slicedToArray(_React$useState15, 2),
        beginHit = _React$useState16[0],
        _ = _React$useState16[1];

    var _React$useState17 = React.useState(new Date()),
        _React$useState18 = _slicedToArray(_React$useState17, 2),
        startMs = _React$useState18[0],
        setStartMs = _React$useState18[1];
    // fetch from API and update later on => set to 1 if all trials finished, set to 2 if ...


    var _React$useState19 = React.useState(2),
        _React$useState20 = _slicedToArray(_React$useState19, 2),
        statusCode = _React$useState20[0],
        setStatusCode = _React$useState20[1];

    var _React$useState21 = React.useState({ display: "none" }),
        _React$useState22 = _slicedToArray(_React$useState21, 2),
        showOverlay = _React$useState22[0],
        setShowOverlay = _React$useState22[1];

    var handleAssigned = function handleAssigned(assignment) {
      fetch("http://localhost:5000/create-assignment/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(assignment)
      }).then(function (response) {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      }).then(function (res) {
        console.log("res", res);
        setAssignmentId(res.assignment_id);
        setTrials(res.trials_completed);
        console.log("Success: Worker " + workerId + " started assignment " + res.assignment_id + ".");
      }).catch(function (err) {
        console.log("Error:", err.toString());
      });
    };

    var _handleSubmit = function _handleSubmit() {
      if (selection.length == 2) {
        var endHit = new Date();
        var submitTime = endHit - startMs;
        var newStatusCode = statusCode;
        if (trials == 0) {
          newStatusCode = 2;
          setStatusCode(newStatusCode);
        } else if (trials + 1 == nTrials) {
          newStatusCode = 1;
          setStatusCode(newStatusCode);
        }

        setTrials(trials + 1);
        setImgsLoaded(false);
        setStimulusSet(randomIntArray(0, 119, 9));
        var computeChoiceSet = function computeChoiceSet() {
          var set = selection.map(function (el) {
            return stimulusSet[el - 1];
          });
          return set.concat(stimulusSet.filter(function (i) {
            return !set.includes(i);
          }));
        };
        var choiceSet = computeChoiceSet();

        var trial = {
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
          rating: "" // TODO unclear
        };
        fetch("http://localhost:5000/create-trial/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(trial)
        }).then(function (response) {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response.json();
        }).then(function (res) {
          console.log("Trial " + res.trial_id + " submission successful.");
        }).catch(function (err) {
          console.log("Error:", err.toString());
        });

        var assignmentUpdate = {
          assignment_id: assignmentId,
          end_hit: endHit,
          status_code: newStatusCode
        };
        fetch("http://localhost:5000/update-assignment/", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(assignmentUpdate)
        }).then(function (response) {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response.json();
        }).then(function (res) {
          console.log("Assignment " + res.assignment_id + " update successful.");
        }).catch(function (err) {
          console.log("Error:", err.toString());
        });

        // reset some states for the next trail
        setSelection([]);
        setSelectionTimes([]);
        setStartMs(new Date());
      }
    };

    var handleSelect = function handleSelect(id) {
      var time = new Date() - startMs;
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

    var handleRedirect = function handleRedirect() {
      window.location.href = redirectURL;
    };

    // runs once at the beginning of the assignment
    React.useEffect(function () {
      if (trials == 0) {
        var assignment = {
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
          ver: 2
        };
        handleAssigned(assignment);
      }
    }, [trials]);

    // runs once before each trial to preload the images
    React.useEffect(function () {
      var loadImage = function loadImage(imgId) {
        return new Promise(function (resolve, reject) {
          var loadImg = new Image();
          loadImg.src = imgPaths[imgId];
          loadImg.onload = function () {
            return setTimeout(function () {
              resolve(imgPaths[imgId]);
            }, transitionTime);
          };
          loadImg.onerror = function (err) {
            return reject(err);
          };
        });
      };

      Promise.all(stimulusSet.map(function (imgId) {
        return loadImage(imgId);
      })).then(function () {
        return setImgsLoaded(true);
      }).catch(function (err) {
        return console.log("Failed to load images", err);
      });
    }, [stimulusSet]);

    // rendering
    return React.createElement(
      "div",
      null,
      trials < nTrials ? React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          {
            className: "overlay overlay-instructions",
            style: showOverlay,
            onClick: function onClick() {
              return setShowOverlay({ display: "none" });
            }
          },
          React.createElement(
            "div",
            { className: "container" },
            React.createElement(
              "div",
              { className: "welcome" },
              React.createElement(
                "div",
                { className: "instructions" },
                React.createElement(Instructions, null),
                React.createElement(ImageContainerMini, null),
                React.createElement(
                  "button",
                  {
                    type: "text",
                    className: "proceed-button proceed-button-info",
                    onClick: function onClick() {
                      return setShowOverlay({ display: "none" });
                    }
                  },
                  "OK"
                )
              )
            )
          )
        ),
        React.createElement(ProgressBarContainer, { nTrials: nTrials, trials: trials }),
        React.createElement(Prompt, null),
        React.createElement(
          React.Suspense,
          { fallback: React.createElement(ImageContainerLoader, null) },
          React.createElement(ImageContainer, {
            stimulusSet: stimulusSet,
            imgsLoaded: imgsLoaded,
            selection: selection,
            handleSelect: handleSelect
          })
        ),
        React.createElement(
          "div",
          { className: "bottom-tile" },
          React.createElement(
            "div",
            { className: "info-button-tile" },
            React.createElement(
              "button",
              {
                className: "info-button",
                onClick: function onClick() {
                  return setShowOverlay({ display: "block" });
                }
              },
              "?"
            )
          ),
          React.createElement(
            "div",
            { className: "submit-button-tile" },
            React.createElement(SubmitButton, {
              handleSubmit: function handleSubmit() {
                return _handleSubmit();
              },
              selection: selection
            })
          ),
          React.createElement("div", { className: "info-button-tile" })
        )
      ) : React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "goodbye" },
          React.createElement(
            "div",
            { className: "goodbye-msg-btn" },
            React.createElement(
              "span",
              null,
              "Thank you for your participation!"
            ),
            React.createElement(
              "button",
              {
                className: "goodbye-button",
                onClick: function onClick() {
                  return handleRedirect();
                }
              },
              "Complete the task"
            )
          )
        )
      )
    );
  }
};