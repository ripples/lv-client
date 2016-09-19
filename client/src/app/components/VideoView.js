"use strict";

import React from "react";

export default class VideoView extends React.Component {

  render() {
    return (
      <div className="videoViewContainer">
        <video width="25%" height="25%" controls onTimeUpdate={e => this.props.sync(e.target.currentTime)}>
          <source src={this.props.video} type="video/mp4"/>
        </video>
      </div>
    );
  }
}

VideoView.propTypes = {
  video: React.PropTypes.any.isRequired,
  sync: React.PropTypes.func.isRequired
};
