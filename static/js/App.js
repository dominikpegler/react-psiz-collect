"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var nTrials = 40;
var transitionTime = 100; // before images are loaded and spinner is shown.

// Base container
var BaseContainer = function BaseContainer() {
  {
    var _React$useState = React.useState(0),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        trials = _React$useState2[0],
        setTrials = _React$useState2[1];

    var _React$useState3 = React.useState(randomIntArray(0, 119, 9)),
        _React$useState4 = _slicedToArray(_React$useState3, 2),
        stimulusSet = _React$useState4[0],
        setStimulusSet = _React$useState4[1];

    var _React$useState5 = React.useState(false),
        _React$useState6 = _slicedToArray(_React$useState5, 2),
        imgsLoaded = _React$useState6[0],
        setImgsLoaded = _React$useState6[1];

    var _React$useState7 = React.useState([]),
        _React$useState8 = _slicedToArray(_React$useState7, 2),
        selection = _React$useState8[0],
        setSelection = _React$useState8[1];

    var _React$useState9 = React.useState(0),
        _React$useState10 = _slicedToArray(_React$useState9, 2),
        numberOfUpdates = _React$useState10[0],
        setNumberOfUpdates = _React$useState10[1];
    // numberOfUpdates is needed only because without it the child components (<Tile/>)
    // would not update. maybe there is a better solution.

    var _handleSubmit = function _handleSubmit() {
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
        var computeChoiceSet = function computeChoiceSet() {
          var set = selection.map(function (el) {
            return stimulusSet[el - 1];
          });
          return set.concat(stimulusSet.filter(function (i) {
            return !set.includes(i);
          }));
        };
        var choiceSet = computeChoiceSet();
        console.log("stimulusSet:", stimulusSet);
        console.log("choiceSet:", choiceSet);
        console.log("submitted!");
        setSelection([]);
      }
    };

    var handleSelect = function handleSelect(id) {
      var selectionNew = selection;
      if (selection.includes(id)) {
        selectionNew.splice(selection.indexOf(id), 1);
      } else if (selectionNew.length < 2) {
        selectionNew.push(id);
      }
      setSelection(selectionNew);
      setNumberOfUpdates(numberOfUpdates + 1);
    };

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
    }, [imgsLoaded]);

    return React.createElement(
      "div",
      null,
      trials < nTrials ? React.createElement(
        "div",
        { className: "container" },
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
          { className: "submit-button-tile" },
          React.createElement(SubmitButton, {
            handleSubmit: function handleSubmit() {
              return _handleSubmit();
            },
            selection: selection
          })
        )
      ) : React.createElement(
        "div",
        { className: "container" },
        "Vielen Dank f\xFCr die Teilnahme!"
      )
    );
  }
};

var domContainer = document.querySelector("#react-container");
var root = ReactDOM.createRoot(domContainer);
root.render(React.createElement(BaseContainer, null));