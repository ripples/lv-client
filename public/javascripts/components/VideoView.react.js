"use strict";

import React from "react";

import mediaStore from "../stores/MediaStore";
import mediaActions from "../actions/MediaAction";

export default class VideoView extends React.Component {
  componentDidMount() {
    // create interval function to periodically sync video tracking
    this.checkSyncInterval = setInterval(this.checkTimeSync, (500));
  }

  componentWillUnmount() {
    // clear interval function
    clearInterval(this.checkSyncInterval);
  }

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

  syncTimestamps(timestamp) {
    // synchronize the video time with other components
    mediaActions.sync(timestamp);
  }

  render() {
    return (
      <div className="videoViewContainer">
        <video width="100%" height="70%" id={this.props.videoID} controls>
          <source src={this.props.src} type="video/mp4"/>
          Your browser does not support HTML5 video.
        </video>
      </div>
    );
  }
}