import React from "react";

export const Debrief = ({ handleDebrief }) => {
  const textInput = React.useRef();
  return (
    <div className={"experiment-container"}>
      <div className={"debrief"}>
        <h3 style={{ textAlign: "center" }}>Study feedback</h3>
        <p>Dear Participant,</p>
        <p>
          Thank you for participating in our research study. We hope that you
          found the experience interesting and informative.
        </p>
        <p>
          The purpose of this study was to examine how fear-eliciting simuli are
          mentally represented.
        </p>
        <p>
          If you have any questions or concerns about your participation in this
          study, please do not hesitate to contact us at
          a01468373@unet.univie.ac.at
        </p>
        <p>
          The following questions are all optional. All feedback, both positive
          and negative, is appreciated. Providing feedback here will have no
          effect on your receiving payment for taking part in this study.
        </p>
        <hr />
      </div>
      <div className={"container-debrief-questionnaire"}>
        <div className={"debrief-question"}>
          <span style={{ marginRight: "2rem" }}>
            How did you enjoy taking part in this study?
          </span>
          <ResponseBoxDebrief
            scale={[
              { value: 1, label: "Low" },
              { value: 2, label: "" },
              { value: 3, label: "" },
              { value: 4, label: "" },
              { value: 5, label: "High" },
            ]}
            key={"question_1"}
            // setSelection={setSelection}
            // selection={selection}
          />
        </div>
        <div className={"debrief-question"}>
          <span style={{ marginRight: "2rem" }}>
            How interesting did you find this study?
          </span>
          <ResponseBoxDebrief
            scale={[
              { value: 1, label: "Boring" },
              { value: 2, label: "" },
              { value: 3, label: "" },
              { value: 4, label: "" },
              { value: 5, label: "Interesting" },
            ]}
            key={"question_2"}
            // setSelection={setSelection}
            // selection={selection}
          />
        </div>
        <div className={"debrief-question"}>
          <span style={{ marginRight: "2rem" }}>
            How well were the study instructions explained?
          </span>
          <ResponseBoxDebrief
            scale={[
              { value: 1, label: "Not very well" },
              { value: 2, label: "" },
              { value: 3, label: "" },
              { value: 4, label: "" },
              { value: 5, label: "Very well" },
            ]}
            key={"question_3"}
            // setSelection={setSelection}
            // selection={selection}
          />
        </div>
        <div className={"debrief-question"}>
          <span style={{ marginRight: "2rem" }}>
            What is your opinion on the length of the study?
          </span>
          <ResponseBoxDebrief
            scale={[
              { value: 1, label: "Too short" },
              { value: 2, label: "" },
              { value: 3, label: "" },
              { value: 4, label: "" },
              { value: 5, label: "Too long" },
            ]}
            key={"question_4"}
            // setSelection={setSelection}
            // selection={selection}
          />
        </div>
        <div className={"debrief-question"}>
          <span style={{ marginRight: "2rem" }}>
            How much attention did you pay to the experiment (your response
            won't come with any disadvantages)?
          </span>
          <ResponseBoxDebrief
            scale={[
              { value: 1, label: "No attention" },
              { value: 2, label: "" },
              { value: 3, label: "" },
              { value: 4, label: "" },
              { value: 5, label: "Full attention" },
            ]}
            key={"question_5"}
            // setSelection={setSelection}
            // selection={selection}
          />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className={"debrief-question"}
        >
          {" "}
          <span style={{ marginRight: "2rem" }}>
            Do you have any comments about the study?
          </span>
          <textarea
            autofocus
            ref={textInput}
            style={{ width: "60%", height: "100px" }}
          />
        </div>
      </div>

      <button
        type="text"
        className={"proceed-button"}
        onClick={() => handleDebrief(textInput)}
      >
        Complete Study
      </button>
    </div>
  );
};

const ResponseBoxDebrief = ({ scale, key }) => {
  const id = "debrief".concat("-", String(key));

  const [value, setValue] = React.useState("");

  //const handleChange = (event) => {
  //  setValue(event.target.value);
  //  let newSelection = selection;
  //  newSelection[k] = event.target.value;
  //  setSelection(newSelection);
  //};

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        fontSize: "small",
      }}
    >
      {scale &&
        scale.map((likert, idx) =>
          likert ? (
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
                for={id + "-" + String(likert.value)}
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
                // onChange={handleChange}
              />
            </div>
          ) : (
            <div></div>
          )
        )}
    </form>
  );
};
