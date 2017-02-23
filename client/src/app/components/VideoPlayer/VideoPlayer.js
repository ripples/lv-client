import React from "react";
import videojs from "video.js";
import {connect} from "react-redux";
import {updateVideoTimeStampAction} from "./../../libs/actions";

class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, () => {
      this.player.on("timeupdate", () => {
        this.props.updateVideoTimeStamp(this.props.startTime, this.player.currentTime(), this.props.ids);
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
  startTime: React.PropTypes.number.isRequired,
  ids: React.PropTypes.object.isRequired,
  updateVideoTimeStamp: React.PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    updateVideoTimeStamp: (startTime, newTime, ids) => dispatch(updateVideoTimeStampAction(startTime, newTime, ids))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);
