import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

class VideoView extends React.Component {

  render() {
    const videoJsOptions = {
      autoPlay: true,
      controls: true,
      sources: [{
        src: BASE_URL + "/media/F16/COMPSCI 460/08-26-2016--08-59-01/video",
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
            bufferImages={this.props.bufferImages}
          />
        </div>
      </div>
    );
  }
}

VideoView.propTypes = {
  bufferImages: React.PropTypes.func.isRequired
  // video: React.PropTypes.any.isRequired,
  // sync: React.PropTypes.func.isRequired
};

export default VideoView;
