import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";

class InputView extends React.Component {

  // TODO Replace the iframe in here with the video:
  render() {
    return (
      <div>
        <div className="video-view">
          <img
            src={BASE_URL + "/media/F16/COMPSCI 460/08-26-2016--08-59-01/images/computer/full/computer-0-1472216342"}
            height={"358"}
            width={"638"}
          />
        </div>
    </div>
    );
  }
}

InputView.propTypes = {
  //
};

export default InputView;
