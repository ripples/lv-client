import React from "react";
import videojs from "video.js";
import {connect} from "react-redux";
import {updateVideoTimeStampAction} from "./../../libs/actions";

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => {
      this.player.on("timeupdate", () => {
        this.props.updateVideoTimeStamp(this.player.currentTime());
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
        className="video-js vjs-default-skin">
      </video>
    );
  }
}

VideoPlayer.propTypes = {
  updateVideoTimeStamp: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    updateVideoTimeStamp: newTime => dispatch(updateVideoTimeStampAction(newTime))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
