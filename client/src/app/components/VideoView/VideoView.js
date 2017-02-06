import React from "react";

class VideoView extends React.Component {

  // TODO Replace the iframe in here with the video:
  render() {
    return (
      <div>
        <div className="video-view">
          <iframe
            className="video"
            src={"https://www.youtube.com/embed/vtvnE1l98I4"}
            allowFullScreen
            height={"358"}
            width={"638"}/>
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
