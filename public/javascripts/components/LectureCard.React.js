"use strict";

import React from "react";
import MediaComponent from "./MediaComponent.react";
import mediaActions from "../actions/MediaAction";
import mediaStore from "../stores/MediaStore";

export default class LectureCard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      media: null
    };
  }

  _onChange() {
    this.setState({
      show: true,
      media: mediaStore.getPrimary()
    })
  }

  componentDidMount() {
    mediaStore.addChangeListener(this._onChange);
  }

  componentWillUnmount() {
    mediaStore.removeChangeListener(this._onChange);
  }

  fetchMedia() {
    mediaActions.fetch(this.props.courseId, this.props.lecture);
  }

  render() {
    if (!this.state.show) {
      return;
    }
    let mediaComponent = null;
    if (this.state.media) {
      mediaComponent = <MediaComponent src={this.state.media}/>;
    }
    return (
      <div>
        <h1>
          {this.props.lecture}
        </h1>
        <div>
          {JSON.stringify(this.props.lectureData)}
        </div>
        <a onClick={() => this.fetchMedia()}>
          Load Media
        </a>
        {mediaComponent}
      </div>
    );
  }
}
