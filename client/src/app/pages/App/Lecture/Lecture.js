import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import moment from "moment";

import LectureMedia from "components/LectureMedia/LectureMedia";
import {getLectureImagesAction, initImageAction, updateVideoTimeStampAction} from "./../../../libs/actions";

class Lecture extends React.Component {
  componentWillUnmount() {
    this.props.initImage(this.props.lecture);
  }
  render() {
    if (this.props.course.empty) {
      return (<div></div>);
    }
    let lectureTimeStamp = moment(this.props.lecture.timestamp * 1000);
    return (
      <div className="lecture">
        <div className="lecture-header">
          <Link to="/courses">My Courses</Link>
          {" / "}
          <Link to={`/courses/${this.props.course.id}`}>
            {this.props.course.title.split(":")[0]}
          </Link>
          {" / "}
          {lectureTimeStamp.format("MMMM Do YYYY")}
          <h1>
            {this.props.course.title}
          </h1>
          <h3>
            {lectureTimeStamp.format("dddd, MMMM Do YYYY")}
          </h3>
        </div>
        <div className="lecture-body">
          <LectureMedia
            lecture={this.props.lecture}
            updateVideoTimeStamp={this.props.updateVideoTimeStamp}
          />
        </div>
      </div>
    );
  }
}

Lecture.propTypes = {
  params: React.PropTypes.object,
  lecture: React.PropTypes.object.isRequired,
  course: React.PropTypes.object.isRequired,
  getLectureImages: React.PropTypes.func.isRequired,
  initImage: React.PropTypes.func.isRequired,
  updateVideoTimeStamp: React.PropTypes.func.isRequired
};

// TODO figure out a way to avoid courses ever being empty
const mapStateToProps = (state, ownProps) => {
  let course = state.courses[ownProps.params.courseId];
  if (!course) {
    return {course: {empty: true}, lecture: {empty: true}};
  }
  let lecture = {
    ...course.lectures[ownProps.params.lectureId],
    title: ownProps.params.lectureId,
    lectureId: ownProps.params.lectureId,
    courseId: ownProps.params.courseId,
    semester: "F16"
  };
  return {
    course,
    lecture
  };
};

const mapDispatchToProps = dispatch => {
  return {
    initImage: lecture => dispatch(initImageAction(lecture)),
    getLectureImages: lecture => dispatch(getLectureImagesAction(lecture)),
    updateVideoTimeStamp: (lecture, newTime) => dispatch(updateVideoTimeStampAction(lecture, newTime))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
