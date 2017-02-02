import React from "react";

class VideoView extends React.Component {

  render() {
    return (
      <div className="video-view">
        <span>video here</span>
      </div>
    );
  }
}

VideoView.propTypes = {
  // video: React.PropTypes.any.isRequired,
  // sync: React.PropTypes.func.isRequired
};

export default VideoView;
