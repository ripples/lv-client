"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";

import ImageView from "./ImageView.react";
import VideoView from "./VideoView";

import mediaActions from "../actions/MediaAction";
import mediaStore from "../stores/MediaStore";

export default class MediaPage extends React.Component {
  constructor() {
    super();
    this.state = {
      videoView: null,
      whiteBoardView: null,
      computerView: null
    };
  }

  /**
   * Fetch media data for lecture
   * @private
   */
  _fetchMedia() {
    mediaActions.fetch();
  }

  onMediaChangeListener() {
    const video = mediaStore.getVideoData();
    const whiteBoardImages = mediaStore.getWhiteboardData();
    const computerImages = mediaStore.getComputerData();
    this.setState({
      videoView: <VideoView video={video}/>,
      whiteBoardView: <ImageView images={whiteBoardImages}/>,
      computerView: <ImageView images={computerImages}/>
    });
  }

  componentDidMount() {
    mediaStore.addChangeListener(this.onMediaChangeListener);
    this._fetchMedia();
  }

  componentWillUnmount() {
    mediaStore.removeChangeListener(this.onMediaChangeListener);
  }

  render() {
    return (
      <div className="MediaComponent">
        {this.state.videoView}
        {this.state.whiteBoardView}
        {this.state.computerView}
      </div>
    );
  }
}

MediaPage.propTypes = {

  video: React.PropTypes.shape({
    source: React.PropTypes.string
  }).isRequired
};
