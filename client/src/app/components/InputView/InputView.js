import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";

class InputView extends React.Component {

  // TODO Replace the iframe in here with the video:
  render() {
    return (
      <div>
        <div className="video-view">
          <img
            src={BASE_URL + "/media/F16/COMPSCI 220/08-29-2016--08-59-01/images/computer/full/computer-0-1472475598"}
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
