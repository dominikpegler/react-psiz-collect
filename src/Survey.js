"use strict";

const Survey = ({ workerId, setSurveyFinished, setConsent }) => {
  {
    const [survey, setSurvey] = React.useState();
    const [pageNo, setPageNo] = React.useState(0);
    const [pages, setPages] = React.useState();
    const [assignmentId, setAssignmentId] = React.useState();
    const [beginHit, _] = React.useState(new Date());
    const [startMs, setStartMs] = React.useState(new Date());
    // fetch from API and update later on => set to 1 if all trials finished, set to 2 if ...
    const [statusCode, setStatusCode] = React.useState(2);
    const [selection, setSelection] = React.useState();

    const ITEMS_PER_PAGE = 6;

    const handlePagination = (move) => {
      if (pageNo + move >= 0 && pageNo + move < pages) {
        setPageNo(pageNo + move);
      } else if (pageNo + move >= pages) {
        setSurveyFinished(true);
      } else if (pageNo + move < 0) {
        setConsent(false);
      }
    };

    const downloadSurveyData = (projectId) => {
      fetch(SERVER_URL + "/get-surveys-by-project-id/" + projectId, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((res) => {
          setSurvey(res);
          setPages(
            Math.ceil(Object.keys(res[0]["items"]).length / ITEMS_PER_PAGE)
          );
        })
        .catch((err) => {
          console.log("Error:", err.toString());
        });
    };

    // runs only once at the beginning
    React.useEffect(() => {
      downloadSurveyData(projectId);
    }, []);

    // rendering
    return (
      <div>
        <div className={"container"}>
          <div className={"welcome"}>
            <h1>{survey && survey[0]["name"]}</h1>
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
                    />
                  </div>
                ))}
              {1 + pageNo}/{pages}
            </div>
            <div className={"bottom-tile"} style={{ justifyContent: "center" }}>
              <div className={"submit-button-tile"}>
                <button onClick={() => handlePagination(-1)}>Back</button>
              </div>
              <div className={"submit-button-tile"}>
                <button
                  //disabled={pages && pageNo == pages.length - 1} // disable only if all item values are set
                  onClick={() => handlePagination(1)}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const ResponseBox = ({ s, k, setSelection, selection }) => {
  const id = s["prefix"].concat("-", String(k));

  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <form
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
                  type={"radio"}
                  checked={value == likert.value}
                  id={id + "-" + String(likert.value)}
                  value={likert.value}
                  style={{ cursor: "pointer" }}
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
