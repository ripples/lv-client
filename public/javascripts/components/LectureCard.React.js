"use strict";

import React from "react";
import {Link} from "react-router";

class LectureCard extends React.Component {
  constructor() {
    super();
    this.state = {
      show: true,
      media: null
    };
  }

  buildHtml() {
    const lecture = this.props.lecture;
    const mediaRoute = `/courses/${this.props.courseId}/${this.props.lectureName}`;

    return (
      <div className="col-sm-6">
        <h2>Lecture: {lecture.lectureName}</h2>
        <p><em>Date: {lecture.timestamp}</em></p>
        <p>Runtime:{lecture.duration}</p>
        <Link className="btn btn-success" to={mediaRoute}>
          Load Media
        </Link>
      </div>
    );
  }

  render() {
    if (!this.state.show) {
      return;
    }
    const lectureInfo = this.buildHtml();
    return (
      <div className="container">
        {lectureInfo}
      </div>
    );
  }
}

LectureCard.propTypes = {
  lecture: React.PropTypes.object.isRequired,
  courseId: React.PropTypes.string.isRequired,
  lectureName: React.PropTypes.string.isRequired
};

export default LectureCard;
