"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";

import ImageView from "./ImageView.react";
import VideoView from "./VideoView.react";

export default class MediaComponent extends React.Component {
  render() {
    const media = this.props.media;
    return (
      <div className="MediaComponent">
        <VideoView src={media.video}/>
        <ImageView src={media.images}/>
      </div>
    );
  }
}

