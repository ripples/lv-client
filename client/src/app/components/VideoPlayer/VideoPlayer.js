import React from "react";
import videojs from "video.js";

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => {
      console.log("onPlayerReady", this);
      this.player.on("timeupdate", () => {
        this.props.bufferImages(this.player.currentTime());
      });
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <video
        ref={node => this.videoNode = node}
        className="video-js vjs-default-skin"></video>
    );
  }
}

VideoPlayer.propTypes = {
  bufferImages: React.PropTypes.func.isRequired
};
