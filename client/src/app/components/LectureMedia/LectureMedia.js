import React from "react";
import VideoView from "components/VideoView/VideoView";
import InputView from "components/InputView/InputView";

class LectureMedia extends React.Component {
  render() {
    return (
      <div className="lecture-media">
        <div className="video-wrapper">
          <VideoView/>
        </div>
        <div className="input-wrapper">
          <InputView/>
        </div>
      </div>
    );
  }
}

LectureMedia.propTypes = {
  lecture: React.PropTypes.object.isRequired
};

export default LectureMedia;
