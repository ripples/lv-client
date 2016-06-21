"use strict";

import React from "react";
import MediaComponent from "./MediaComponent.react";
import mediaActions from "../actions/MediaAction";
import mediaStore from "../stores/MediaStore";

class LectureCard extends React.Component {
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
    });
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

  parseLectures() {
    const lecture = this.props.lecture;
    let element =
      <div className="col-sm-6">
        <h2>Lecture: {lecture.lecture}</h2>
        <p><em>Date: {lecture.lecture}</em></p>
        <p>Runtime:{lecture.duration}</p>
        <a className="btn btn-success" onClick={() => this.fetchMedia()}>
          Load Media
        </a>
      </div>;
    return element;
  }

  render() {
    if (!this.state.show) {
      return;
    }
    let mediaComponent = <div className="col-sm-6"><h3>Media Component</h3></div>;
    if (this.state.media) {
      mediaComponent = <MediaComponent src={this.state.media}/>;
    }
    const lectureInfo = this.parseLectures();
    console.log(this.props.lecture);
    return (
      <div className="container">
        {mediaComponent}
        {lectureInfo}
      </div>
    );
  }
}

LectureCard.propTypes = {
  lecture: React.PropTypes.any.isRequired,
  courseId: React.PropTypes.any.isRequired
};

export default LectureCard;
