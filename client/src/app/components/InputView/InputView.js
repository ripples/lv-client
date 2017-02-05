import React from "react";
// src="https://www.youtube.com/embed/rh88-WCOF0E"
class InputView extends React.Component {

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
      <div>
        <span>thumbnail</span>
      </div>
    </div>
    );
  }
}

InputView.propTypes = {
  //
};

export default InputView;
