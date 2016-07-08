"use strict";

import React from "react";

import mediaStore from "../stores/MediaStore";
import mediaActions from "../actions/MediaAction";

export default class VideoView extends React.Component {

  checkTimeSync(e) {
    const currentTime = e.target.currentTime;
    mediaStore.getClosestImage()
  }

  render() {
    return (
      <div className="videoViewContainer">
        <video width="100%" height="70%" controls onTimeUpdate={e => this.checkTimeSync(e)}>
          <source src={this.props.video} type="video/mp4"/>
        </video>
      </div>
    );
  }
}

VideoView.propTypes = {
  video: React.PropTypes.any.isRequired
};
