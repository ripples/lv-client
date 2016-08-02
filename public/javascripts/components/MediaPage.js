"use strict";

/**
 * MediaComponent is a "Superclass"
 **/

import React from "react";

import VideoView from "./VideoView";
import TimelineComponent from "./TimelineComponent";

import MediaActions from "../actions/MediaAction";
import mediaStore from "../stores/MediaStore";

const T = React.PropTypes;

export default class MediaPage extends React.Component {
  static propTypes = {
    params: T.shape({
      semester: T.string.isRequired,
      courseId: T.string.isRequired,
      lectureName: T.string.isRequired
    }).isRequired,
    location: T.shape({
      query: T.shape({
        timestamp: T.string.isRequired
      }).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      videoView: null,
      timelineComponent: null
    };
    this.onMediaChangeListener = this.onMediaChangeListener.bind(this);
    this.sync = this.sync.bind(this);
    this.fetchMedia = this.fetchMedia.bind(this);
  }

  /**
   * Fetch media data for lecture
   * @private
   */
  _fetchInitMedia() {
    let params = this.props.params;
    MediaActions.fetchInit(params.semester, params.courseId, params.lectureName);
  }

  sync(videoTimestamp) {
    const timestamp = Math.floor(videoTimestamp + Number(this.props.location.query.timestamp));
    MediaActions.sync(timestamp);
  }

  fetchMedia(images, imageType) {
    let params = this.props.params;
    MediaActions.fetchImages(params.semester, params.courseId, params.lectureName, images, imageType, "thumbs");
  }

  onMediaChangeListener() {
    const urls = mediaStore.getUrls();
    const currentIndex = mediaStore.getCurrentIndex();
    this.setState({
      videoView: <VideoView video={urls.video} sync={this.sync}/>,
      timelineComponent: (
        <TimelineComponent computer={urls.computerThumbs}
                           whiteboard={urls.whiteboardThumbs}
                           currentIndex={currentIndex}
                           fetchMedia={this.fetchMedia}/>
      )
    });
  }

  componentDidMount() {
    mediaStore.addChangeListener(this.onMediaChangeListener);
    this._fetchInitMedia();
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
