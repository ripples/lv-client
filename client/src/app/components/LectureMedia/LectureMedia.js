import React from "react";

import VideoView from "components/VideoView/VideoView";

class LectureMedia extends React.Component {
  render() {
    return (
      <div className="lecture-media">
        <div className="video-wrapper">
          <VideoView />
        </div>
      </div>
    );
  }
}

LectureMedia.propTypes = {
  lecture: React.PropTypes.object.isRequired
};

export default LectureMedia;
