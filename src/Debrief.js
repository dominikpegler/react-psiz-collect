const Debrief = ({ handleDebrief }) => {

  return (
    <div className={"container"}>
      <div className={"consent"}>
        <div style={{ width: "1000px", backgroundColor: "white" }}>
          <h3 style={{ textAlign: "center" }}>
            Information upon finishing the study
          </h3>
          <p>Dear Participant,

Thank you for participating in our research study. We hope that you found the experience interesting and informative.

The purpose of this study was to examine [insert specific research question or aim of the study]. Your participation in this study involved [insert specific tasks or activities completed during the study].

It is important for you to know that your participation in this study was completely voluntary, and you were free to withdraw at any time without any negative consequences. We also want to assure you that all of your responses will be kept confidential and will be used only for research purposes.

If you have any questions or concerns about your participation in this study, please do not hesitate to contact us at [insert researcher contact information].

Again, thank you for your participation. Your contribution to our research is greatly appreciated.

Sincerely,

The Research Team</p>
        </div>
        <button
          type="text"
          className={"proceed-button"}
          onClick={() => handleDebrief()}
        >
          Complete Study
        </button>
      </div>
    </div>
  );
};
