import React from "react";
import VideoView from "components/VideoView/VideoView";
import InputView from "components/InputView/InputView";
import ThumbnailControl from "components/ThumbnailControl/ThumbnailControl";

class LectureMedia extends React.Component {

  constructor(props) {
    super(props);
    this.bufferImages = this.bufferImages.bind(this);
  }

  bufferImages(timestamp) {
    console.log(timestamp);
  }

  render() {
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              bufferImages={this.bufferImages}
            />
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
  lecture: React.PropTypes.object.isRequired
};

export default LectureMedia;
