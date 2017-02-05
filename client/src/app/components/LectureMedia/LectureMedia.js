import React from "react";
import VideoView from "components/VideoView/VideoView";
import InputView from "components/InputView/InputView";

class LectureMedia extends React.Component {
  render() {
    return (
      <div className="lecture-media">
        <div className="video-wrapper rectangle-3">
          <VideoView/>
        </div>
        <div className="video-wrapper rectangle-3-copy">
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
