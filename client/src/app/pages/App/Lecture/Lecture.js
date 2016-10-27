import React from "react";
import {connect} from "react-redux";
import moment from "moment";

import LectureMedia from "components/LectureMedia/LectureMedia";

class Lecture extends React.Component {
  render() {
    return (
      <div className="lecture">
        <div className="lecture-header">
          <h1>
            {this.props.course.title.split(":")[0]}: {this.props.lecture.title}
          </h1>
          <h4>
            {moment(this.props.lecture.date).format("dddd, MMMM Do YYYY")}
          </h4>
        </div>
        <div className="lecture-body">
          <LectureMedia lecture={this.props.lecture} />
        </div>
      </div>
    );
  }
}

Lecture.propTypes = {
  params: React.PropTypes.object,
  lecture: React.PropTypes.object.isRequired,
  course: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return {
    lecture: Object.assign({}, state.lectures[ownProps.params.lectureId]),
    course: state.courses.find(course => course.id === ownProps.params.courseId)
  };
};

export default connect(mapStateToProps)(Lecture);
