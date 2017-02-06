import React from "react";

class InputView extends React.Component {

  // TODO Replace the iframe in here with the video:
  render() {
    return (
      <div>
        <div className="video-view">
          <iframe
            className="video"
            src="https://www.youtube.com/embed/rh88-WCOF0E"
            allowFullScreen
            height={"358"}
            width={"638"}/>
        </div>
    </div>
    );
  }
}

InputView.propTypes = {
  //
};

export default InputView;
