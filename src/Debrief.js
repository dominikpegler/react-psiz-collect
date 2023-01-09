const Debrief = ({ handleDebrief }) => {

  return (
    <div className={"container"}>
      <div className={"consent"} style={{maxWidth:"720px"}}>
          <h3 style={{ textAlign: "center" }}>
            Study feedback 
          </h3>
          <p>Dear Participant,</p>
          <p>Thank you for participating in our research study. We hope that you found the experience interesting and informative.</p>
          <p>The purpose of this study was to examine how fear-eliciting simuli are mentally represented.</p>
          <p>If you have any questions or concerns about your participation in this study, please do not hesitate to contact us at a01468373@unet.univie.ac.at</p>
          <p>The following questions are all optional. All feedback, both positive and negative, is appreciated. Providing feedback here will have no effect on your receiving payment for taking part in this study.</p>
        </div>
        <button
          type="text"
          className={"proceed-button"}
          onClick={() => handleDebrief()}
        >
          Complete Study
        </button>
      </div>
  );
};
