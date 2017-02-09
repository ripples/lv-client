import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

class VideoView extends React.Component {
  render() {
    const videoJsOptions = {
      autoPlay: true,
      controls: true,
      height: 800,
      width: 800,
      sources: [{
        src: BASE_URL + "/media/F16/COMPSCI 220/08-29-2016--08-59-01/video",
        type: "video/mp4"
      }]
    };
    return (
      <div className="video-view" height="800px" width="800px">
        <div className="video" height="800px" width="800px">
          <VideoPlayer height="800px" width="800px" { ...videoJsOptions } />
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
