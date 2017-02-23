import React from "react";
import VideoView from "components/VideoView/VideoView";
import InputView from "components/InputView/InputView";
import ThumbnailControl from "components/ThumbnailControl/ThumbnailControl";

class LectureMedia extends React.Component {

  render() {
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView startTime={this.props.lecture.timestamp || 0} ids={this.props.ids}/>
          </div>
        </div>
        <div className="container">
          <div className="video-wrapper">
            <InputView/>
            <ThumbnailControl/>
          </div>
        </div>
      </div>
    );
  }
}

LectureMedia.propTypes = {
  lecture: React.PropTypes.object.isRequired,
  ids: React.PropTypes.object.isRequired
};

export default LectureMedia;
