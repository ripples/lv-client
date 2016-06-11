"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";

import ImageView from "./ImageView.react";
import VideoView from "./VideoView.react";

export default class MediaComponent extends React.Component {
  generateMediaObject() {
    switch (this.props.media.type) {
      case "video" : {
        const videoID = "video" + this.props.media.data.id;
        return (
          <VideoView
            src={this.props.media.data.url}
            videoID={videoID}/>
        );
      }
      case "images" : {
        const source = `/images/${this.props.media.data.id}/${this.props.media.data.timestamp}.png`;
        return (
          <ImageView
            src={source}/>
        );
      }
      default :
        break;
    }
  }

  render() {
    const mediaObj = this.generateMediaObject();
    return (
      <div className="MediaComponent">
        {mediaObj}
      </div>
    );
  }
}

