import React from "react";
import videojs from "video.js";
import {connect} from "react-redux";

class VideoView extends React.Component {
  componentDidMount() {
    const videoJsOptions = {
      height: 358,
      width: 638,
      autoPlay: true,
      controls: true,
      sources: [{
        src: this.props.videoSrc,
        type: "video/mp4"
      }]
    };
    this.player = videojs(this.videoNode, videoJsOptions, () => {
      this.player.on("timeupdate", () => {
        this.props.onVideoTimeUpdate(this.player.currentTime());
      });
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newVideoTime !== this.props.newVideoTime) {
      this.player.currentTime(nextProps.newVideoTime);
    }
  }

  render() {
    return (
      <div>
        <div className="video-view">
          <video
            ref={node => this.videoNode = node}
            className="video-js vjs-default-skin vjs-big-play-centered">
          </video>
        </div>
      </div>
    );
  }
}

VideoView.propTypes = {
  videoSrc: React.PropTypes.string.isRequired,
  onVideoTimeUpdate: React.PropTypes.func.isRequired,
  newVideoTime: React.PropTypes.number
};

function mapStateToProps(state) {
  const media = state.media;
  return {
    newVideoTime: media.newVideoTime
  };
}

export default connect(mapStateToProps, null)(VideoView);
