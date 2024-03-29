import React from "react";
import { ProgressBarContainerSurvey } from "./ProgressBar";

export const Survey = ({
  survey,
  handleSurveyComplete,
  downloadSurveyData,
  pages,
  selection,
  setSelection,
}) => {
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
          >
            <div className={"container"}>
              <div className={"please-answer"}>
                <p>
                  Please answer all questions. The missing answers are now
                  marked in red.
                </p>
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
          {survey && (
            <div className={"welcome"}>
              <h2>{survey[0]["name"]}</h2>
              <ProgressBarContainerSurvey
                nItems={Object.keys(survey[0]["items"]).length}
                nSelected={Object.keys(selection).length}
              />
              <div className={"container-questionnaire"}>
                {survey &&
                  Object.keys(survey[0]["items"]).map((key, idx) => (
                    <div
                      key={idx}
                      style={
                        idx >= pageNo * ITEMS_PER_PAGE &&
                        idx < pageNo * ITEMS_PER_PAGE + ITEMS_PER_PAGE
                          ? {
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              paddingBottom: ".75rem",
                              paddingTop: ".75rem",
                              borderBottom: "1px solid",
                              borderImage:
                                "linear-gradient(to right, lightgray, darkgray) 1",
                            }
                          : { display: "none" }
                      }
                    >
                      <span style={{ marginRight: "2rem" }}>
                        {survey[0]["items"][key]}
                      </span>
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
                <div className={"nav-button-tile"}>
                  <button
                    disabled={pageNo === 0}
                    onClick={() => handlePagination(-1)}
                  >
                    Back
                  </button>
                </div>
                <div className={"nav-button-tile"}>
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
      className={value === "" && indicateMissing ? "response-box-missing" : ""}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      {s.scale &&
        s.scale.map(
          (likert, idx) =>
            likert && (
              <div
                key={idx}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  alignItems: "center",
                  width: "4.7rem",
                }}
              >
                <label
                  //for={id + "-" + String(likert.value)}
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  {likert.label}
                  <br />
                  {likert.value}
                </label>
                <input
                  className={"radio"}
                  type={"radio"}
                  checked={value === likert.value}
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
