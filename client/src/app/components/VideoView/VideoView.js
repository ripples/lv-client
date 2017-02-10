import React from "react";

class VideoView extends React.Component {

  sayVideoTimer() {
    var video = document.getElementById("player");
    console.log(video.currentTime);
  }

  render() {
    return (
      <div className="video-view">
        <div className="video">
          <video id="player"
                 className="video-js vjs-default-skin"
                 src="http://192.168.99.100/api/v1/videotest/video"
                 type="video/mp4"
                 height="50%"
                 width="50%"
                 controls preload="auto">
          </video>
          <img src="http://192.168.99.100/api/v1/videotest/F16/COMPSCI 220/08-29-2016--08-59-01/images/whiteboard/full/whiteBoard-0-1472475961" width="50%" height="50%"></img>
          <button onClick={this.sayVideoTimer}>click me</button>
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
