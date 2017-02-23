import React from "react";
import {BASE_URL} from "../../constants/ApiConstants";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

class VideoView extends React.Component {

  render() {
    if (this.props.ids.lectureId) {
      const videoJsOptions = {
        autoPlay: true,
        controls: true,
        sources: [{
          src: BASE_URL + "/media/F16/" + this.props.ids.courseId + "/" + this.props.ids.lectureId + "/video",
          type: "video/mp4"
        }]
      };
      return (
        <div>
          <div className="video-view">
            <VideoPlayer
              height={"358"}
              width={"638"}
              startTime={this.props.startTime}
              ids={this.props.ids}
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
  startTime: React.PropTypes.number.isRequired,
  ids: React.PropTypes.object.isRequired
};

export default VideoView;
