"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";

import ImageView from "./ImageView";
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
    this.onMediaChangeListener = this.onMediaChangeListener.bind(this);
  }

  /**
   * Fetch media data for lecture
   * @private
   */
  _fetchMedia() {
    let params = this.props.params;
    mediaActions.fetch(params.semester, params.courseId, params.lectureName);
  }

  onMediaChangeListener() {
    const videoUrl = mediaStore.getVideoUrl();
    const computerImageUrl = mediaStore.getComputerImageUrl();
    const whiteBoardImageUrl = mediaStore.getWhiteboardImageUrl();
    // const whiteBoardImages = mediaStore.getWhiteboardImagesIterator();
    // const computerImages = mediaStore.getComputerImagesIterator();
    this.setState({
      videoView: <VideoView video={videoUrl}/>,
      whiteBoardView: <ImageView image={computerImageUrl}/>,
      computerView: <ImageView image={whiteBoardImageUrl}/>
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
  params: React.PropTypes.shape({
    semester: React.PropTypes.string.isRequired,
    courseId: React.PropTypes.string.isRequired,
    lectureName: React.PropTypes.string.isRequired
  }).isRequired
};
