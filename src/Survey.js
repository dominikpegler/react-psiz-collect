"use strict";

const Survey = ({ workerId }) => {
  {
    const [survey, setSurvey] = React.useState([]);
    const [assignmentId, setAssignmentId] = React.useState();
    const [beginHit, _] = React.useState(new Date());
    const [startMs, setStartMs] = React.useState(new Date());
    // fetch from API and update later on => set to 1 if all trials finished, set to 2 if ...
    const [statusCode, setStatusCode] = React.useState(2);
    const [selection, setSelection] = React.useState();

    const QUESTIONS_PP = 6;

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
        })
        .catch((err) => {
          console.log("Error:", err.toString());
        });
    };

    // runs once at the beginning of the assignment
    React.useEffect(() => {
      downloadSurveyData(projectId);
    }, []);

    // rendering
    return (
      <div>
        <div className={"container"}>
          <div>
            {survey &&
              survey.map(
                (s) =>
                  s && (
                    <div>
                      <h1>{s.name}</h1>
                      {s.items &&
                        s.items.map(
                          (item) =>
                            item && (
                              <div>
                                <span>{item}</span>
                                <ResponseBox s={s}  item={item}/>
                              </div>
                            )
                        )}
                    </div>
                  )
              )}
          </div>
          <div className={"bottom-tile"} style={{ justifyContent: "center" }}>
            <div className={"submit-button-tile"}>
              <button onClick={(e) => handleClick(e)}>Proceed</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};


const ResponseBox =({s, item})=> {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: "1rem",
        marginBottom: "3rem"
      }}
    >
      {s.scale.map(
        (likert) =>
          likert && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label for={item + String(likert.value)}>{likert.label}</label>

              <input
                type={"radio"}
                id={item + String(likert.value)}
                name={item}
                value={likert.value}
                style={{ cursor: "pointer" }}
              />
            </div>
          )
      )}
    </div>
  );
}

