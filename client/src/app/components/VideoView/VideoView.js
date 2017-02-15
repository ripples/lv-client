import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

class VideoView extends React.Component {

  sayVideoTimer() {
    var video = document.getElementById("player");
    console.log(video.currentTime);
  }

  render() {
    const videoJsOptions = {
      autoPlay: true,
      controls: true,
      sources: [{
        src: BASE_URL + "/media/F16/COMPSCI 220/08-29-2016--08-59-01/video",
        type: "video/mp4"
      }]
    };
    return (
      <div>
        <div className="video-view">
          <VideoPlayer
            height={"358"}
            width={"638"}
            { ...videoJsOptions }
          />
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
