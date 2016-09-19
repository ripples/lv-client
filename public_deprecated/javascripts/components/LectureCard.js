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

  _buildWatchRouteOptions() {
    const props = this.props;
    const lecture = props.lecture;

    return {
      pathname: `/watch/${props.semester}/${props.courseId}/${lecture.lectureName}`,
      query: {timestamp: lecture.timestamp}
    };
  }

  _buildHtml() {
    const props = this.props;
    const lecture = props.lecture;
    return (
      <div className="col-sm-6">
        <h2>Lecture: {lecture.lectureName}</h2>
        <p><em>Date: {lecture.timestamp}</em></p>
        <p>Runtime:{lecture.duration}</p>
        <Link className="btn btn-success" to={this._buildWatchRouteOptions()}>
          Load Media
        </Link>
      </div>
    );
  }

  render() {
    if (!this.state.show) {
      return;
    }
    const lectureInfo = this._buildHtml();
    return (
      <div className="container">
        {lectureInfo}
      </div>
    );
  }
}

LectureCard.propTypes = {
  semester: React.PropTypes.string.isRequired,
  lecture: React.PropTypes.object.isRequired,
  courseId: React.PropTypes.string.isRequired
};

export default LectureCard;
