"use strict";

import React from "react";

import mediaStore from "../stores/MediaStore";
import mediaActions from "../actions/MediaAction";

export default class VideoView extends React.Component {

  checkTimeSync() {
    // check the video time with the MediaStore
    if (document.getElementById(this.props.videoID).paused) {
      return;
    }

    const currentTime = Math.floor(document.getElementById(this.props.videoID).currentTime);
    if (mediaStore.shouldSync(currentTime)) {
      this.syncTimestamps(currentTime);
    }
  }

  render() {
    return (
      <div className="videoViewContainer">
        <video width="100%" height="70%" controls>
          <source src={this.props.video} type="video/mp4"/>
        </video>
      </div>
    );
  }
}

VideoView.propTypes = {
  video: React.PropTypes.any.isRequired
};
