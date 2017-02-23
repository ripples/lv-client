import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

class VideoView extends React.Component {

  render() {
    if (this.props.videoRoute) {
      const videoJsOptions = {
        autoPlay: true,
        controls: true,
        sources: [{
          src: BASE_URL + this.props.videoRoute,
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
    return (<div></div>);
  }
}

VideoView.propTypes = {
  videoRoute: React.PropTypes.string
};

export default VideoView;
