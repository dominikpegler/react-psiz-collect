"use strict";

const Prompt = () => {
  return (
    <div className={"prompt"}>
      <span className={"prompt-txt-1"}>
        Select the 2 tiles you consider most similar to the{" "}
      </span>
      <span className={"prompt-txt-2"}>center tile</span>.
    </div>
  );
};

const Instructions = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Instructions </h2>
      <ul>
        <li>
          <span className={"instructions-txt-1"}>
            Select the 2 tiles you consider most similar to the{" "}
          </span>
          <span className={"instructions-txt-2"}>center tile</span>.
        </li>
        <ul>
          <li>
            Select the tiles in the order of their <b>similarity</b>. Once a tile has
            been selected, its ranking will be displayed.
          </li>
          <li>You can <b>unselect</b> a tile by clicking it again.</li>
          <li>You can <b>enlarge</b> an image by right-clicking on it.</li>
          <li>
            Some displays will be easy while others will be challenging. Just do
            your best when making your selection.
          </li>
        </ul>
        <li>When you are happy with your selection, click <b>Submit Selection</b>.</li>
        <li style={{flexDirection:"row"}}><span>You can view the instructions at any time by clicking</span> <button style={{width:"80px", height:"52px", cursor:"default"}}>?</button>.</li>
      </ul>
      <h3 style={{ textAlign: "center" }}>Example:</h3>
    </div>
  );
};
