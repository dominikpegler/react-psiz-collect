"use strict";

const Survey = ({ survey, handleSurveyComplete, downloadSurveyData, pages, selection, setSelection }) => {
  {
    const [pageNo, setPageNo] = React.useState(0);
    const [indicateMissing, setIndicateMissing] = React.useState(false);
    const [showOverlay, setShowOverlay] = React.useState({ display: "none" });

    const ITEMS_PER_PAGE = 6;

    const handlePagination = (move) => {
      if (pageNo + move >= 0 && pageNo + move < pages) {
        setPageNo(pageNo + move);
      } else if (pageNo + move >= pages) {
        if (
          Object.keys(survey[0]["items"]).length ==
          Object.keys(selection).length
        ) {
          handleSurveyComplete(selection); // TODO, call uploadSurveyData from here
        } else {
          setShowOverlay({ display: "block" });
          setIndicateMissing(true);
        }
      } else if (pageNo + move < 0) {
        console.log("Nothing here. ");
        //setConsent(false);
      }
    };

    // runs only once at the beginning
    React.useEffect(() => {
      downloadSurveyData(ITEMS_PER_PAGE);
    }, []);

    // rendering
    return (
      <div>
        <div className={"container"}>
          <div
            className={"overlay overlay-instructions"}
            style={showOverlay}
            onClick={() => setShowOverlay({ display: "none" })}
            onContextMenu={() => setZoom({ display: "none" })}
          >
            <div className={"container"}>
              <div className={"welcome"}>
                <div className={"instructions"}>
                  <div>
                    Please answer all questions. The missing answers are now
                    marked in red.
                  </div>
                  <button
                    type="text"
                    className={"proceed-button proceed-button-info"}
                    onClick={() => setShowOverlay({ display: "none" })}
                    onContextMenu={() => setShowOverlay({ display: "none" })}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          {survey && (
            <div className={"welcome"}>
              <h1>{survey[0]["name"]}</h1>
              <ProgressBarContainerSurvey
                nItems={Object.keys(survey[0]["items"]).length}
                nSelected={Object.keys(selection).length}
              />
              <div className={"container-questionnaire"}>
                {survey &&
                  Object.keys(survey[0]["items"]).map((key, idx) => (
                    <div
                      style={
                        idx >= pageNo * ITEMS_PER_PAGE &&
                        idx < pageNo * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                          ? {
                              display: "block",
                            }
                          : { display: "none" }
                      }
                    >
                      <span>{survey[0]["items"][key]}</span>
                      <ResponseBox
                        s={survey[0]}
                        k={key}
                        setSelection={setSelection}
                        selection={selection}
                        indicateMissing={indicateMissing}
                      />
                    </div>
                  ))}
              </div>
              <div
                className={"bottom-tile"}
                style={{ justifyContent: "center" }}
              >
                <div className={"submit-button-tile"}>
                  <button
                    disabled={pageNo == 0}
                    onClick={() => handlePagination(-1)}
                  >
                    Back
                  </button>
                </div>
                <div className={"submit-button-tile"}>
                  <button onClick={() => handlePagination(1)}>Next</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};

const ResponseBox = ({ s, k, setSelection, selection, indicateMissing }) => {
  const id = s["prefix"].concat("-", String(k));

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    let newSelection = selection;
    newSelection[k] = event.target.value;
    setSelection(newSelection);
  };

  return (
    <form
      className={value == "" && indicateMissing && "response-box-missing"}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: "1rem",
        marginBottom: "2rem",
      }}
    >
      {s.scale &&
        s.scale.map(
          (likert) =>
            likert && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <label for={id + "-" + String(likert.value)}>
                  {likert.label}
                </label>
                <input
                  className={"radio"}
                  type={"radio"}
                  checked={value == likert.value}
                  id={id + "-" + String(likert.value)}
                  value={likert.value}
                  onChange={handleChange}
                />
              </div>
            )
        )}
    </form>
  );
};

const handleSelection = (selection, setSelection, s, k, val) => {
  let newSelection = selection;
  newSelection[s.prefix][k] = val;
  setSelection(newSelection);
};
