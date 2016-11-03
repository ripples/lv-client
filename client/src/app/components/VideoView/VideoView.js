import React from "react";

class VideoView extends React.Component {
  render() {
    return (
      <div className="video-view">
        <div className="video">
          <video width="100%" height controls onTimeUpdate>
            <source src="http://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4"/>
            Your browser does not support HTML5 Video, try
            <a target="_new" href="https://www.google.com/chrome/browser/desktop/">Chrome</a>
          </video>
        </div>
      </div>
    );
  }
}

VideoView.propTypes = {
  // video: React.PropTypes.any.isRequired,
  // sync: React.PropTypes.func.isRequired
};

export default VideoView;
