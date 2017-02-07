import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

class VideoView extends React.Component {
  render() {
    const videoJsOptions = {
      autoPlay: true,
      controls: true,
      sources: [{
        src: BASE_URL + "/a/F16/COMPSCI 220/08-29-2016--08-59-01/video",
        type: "video/mp4"
      }]
    };
    return (
      <div className="video-view">
        <div className="video">
          <VideoPlayer height="400px" width="400px" { ...videoJsOptions } />
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
