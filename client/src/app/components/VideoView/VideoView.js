import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";

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
                 src={BASE_URL+"/videotest/video"}
                 type="video/mp4"
                 height="50%"
                 width="50%"
                 controls preload="auto">
          </video>
          <img src={BASE_URL+"/videotest/F16/COMPSCI 220/08-29-2016--08-59-01/images/whiteboard/full/whiteBoard-0-1472475961"} width="50%" height="50%"></img>
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
