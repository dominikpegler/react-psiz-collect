"use strict";

const Survey = ({ workerId }) => {
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

    const QUESTIONS_PP = 6;

    const handlePagination =(move)=>{
      if ((pageNo + move)>=0 & (pageNo + move)<pages.length) {
        setPageNo(pageNo+move)
      } else {
        console.log("Won't do nothing.")
      }
    }

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

    // runs only once at the beginning
    React.useEffect(() => {
      downloadSurveyData(projectId);
    }, []);


    // runs when survey data changes
    React.useEffect(() => {
      if (survey !== undefined) {
        let i = 0;
        let j;
        let nItems = 0;
        let nPages;
        let len = survey.length;
        let pagesTmp = []
        for (; i < len; ) {
          nItems = survey[i]["items"].length;
          nPages = Math.ceil(nItems / QUESTIONS_PP);
          j = 0;
          for (; j < nPages; ) {
            pagesTmp.push([i, QUESTIONS_PP*j]);
            j++;
          }
          i++;
        } 
          setPages(pagesTmp)
      }
    }, [survey]);
    
    // rendering
    return (
      <div>
        <div className={"container"}>
          <h1>{pages && survey[pages[pageNo][0]]["name"]}</h1>
          <div>
            {pages &&
              survey[pages[pageNo][0]]["items"]
                .slice(pages[pageNo][1], pages[pageNo][1] + QUESTIONS_PP)
                .map((item) => (
                  <div>
                    <span>{item}</span>
                    <ResponseBox
                      s={survey[pages[pageNo][0]]}
                      item={item}
                    />
                  </div>
                ))}
            {1 + pageNo}/{pages && pages.length}
          </div>
          <div className={"bottom-tile"} style={{ justifyContent: "center" }}>
            <div className={"submit-button-tile"}>
              <button
                disabled={pageNo === 0}
                onClick={() => handlePagination(-1)}
              >
                Back
              </button>
            </div>
            <div className={"submit-button-tile"}>
              <button
                disabled={pages && pageNo == pages.length - 1}
                onClick={() => handlePagination(1)}
              >
                Next
              </button>
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
        marginBottom: "2rem"
      }}
    >
      {s.scale && s.scale.map(
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

