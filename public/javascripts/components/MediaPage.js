"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";

import VideoView from "./VideoView";
import TimelineComponent from "./TimelineComponent";

import MediaActions from "../actions/MediaAction";
import mediaStore from "../stores/MediaStore";

export default class MediaPage extends React.Component {
  constructor() {
    super();
    this.state = {
      videoView: null,
      timelineComponent: null
    };
    this.onMediaChangeListener = this.onMediaChangeListener.bind(this);
  }

  /**
   * Fetch media data for lecture
   * @private
   */
  _fetchMedia() {
    let params = this.props.params;
    MediaActions.fetchInit(params.semester, params.courseId, params.lectureName);
  }

  sync(videoTimestamp) {
    Math.floor(videoTimestamp + )
    MediaActions.sync(videoTimestamp);
  }

  onMediaChangeListener() {
    const videoUrl = mediaStore.getVideoUrl();
    const computerImageUrls = mediaStore.getComputerImageUrls();
    const whiteboardImageUrls = mediaStore.getWhiteboardImageUrls();
    this.setState({
      videoView: <VideoView video={videoUrl} sync={this.sync}/>,
      timelineComponent: <TimelineComponent computer={computerImageUrls} whiteboard={whiteboardImageUrls}/>
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
        {this.state.timelineComponent}
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
