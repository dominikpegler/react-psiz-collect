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
      <h1 style={{ textAlign: "center" }}>Instructions </h1>
      <ul>
        <li>
          <span className={"instructions-txt-1"}>
            Select the 2 tiles you consider most similar to the{" "}
          </span>
          <span className={"instructions-txt-2"}>center tile</span>.
        </li>
        <ul>
          <li>
            Select the tiles in the order of their similarity. Once a tile has
            been selected, its ranking will be displayed.
          </li>
          <li>You can unselect a tile by clicking it again.</li>
          <li>
            Some displays will be easy while others will be challenging. Just do
            your best when making your selection.
          </li>
        </ul>
        <li>When you are happy with your selection, click Submit Selection.</li>
        <li>You can view the instructions at any time by clicking ?.</li>
      </ul>
    </div>
  );
};
