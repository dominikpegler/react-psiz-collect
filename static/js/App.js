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

    var _onClickButton = function _onClickButton() {
      setTrials(trials + 1);
      setImgsLoaded(false);
      setStimulusSet(randomIntArray(0, 119, 9));
      console.log("stimulusSet:", stimulusSet);
      console.log("selection:", selection.map(function (el) {
        return stimulusSet[el - 1];
      }));
      console.log("submitted!");
      setSelection([]);
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
        React.createElement(ProgressBar, { nTrials: nTrials, trials: trials }),
        React.createElement(Instructions, null),
        React.createElement(
          React.Suspense,
          { fallback: React.createElement(ImageContainerLoader, null) },
          React.createElement(ImageContainer, {
            stimulusSet: stimulusSet,
            imgsLoaded: imgsLoaded,
            selection: selection,
            setSelection: setSelection
          })
        ),
        React.createElement(Button1, { onClickButton: function onClickButton() {
            return _onClickButton();
          } })
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