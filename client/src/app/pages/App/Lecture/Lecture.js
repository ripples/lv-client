import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import moment from "moment";

import LectureMedia from "components/LectureMedia/LectureMedia";

class Lecture extends React.Component {
  render() {
    return (
      <div className="lecture">
        <div className="lecture-header">
          <Link to="/courses">My Courses</Link>
          /
          <Link to={`/courses/${this.props.course.id}`}>
            {this.props.course.title.split(":")[0]}
          </Link>
          /
          {this.props.lecture.title}
          <h1>
            {this.props.course.title}: {this.props.lecture.title}
          </h1>
          <h4>
            {moment(this.props.lecture.timestamp * 1000).format("dddd, MMMM Do YYYY")}
          </h4>
        </div>
        <div className="lecture-body">
          <LectureMedia
            lecture={this.props.lecture}
            ids={{courseId: this.props.course.title, lectureId: this.props.lecture.title}}
          />
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

// TODO figure out a way to avoid courses ever being empty
const mapStateToProps = (state, ownProps) => {
  if (state.courses.length === 0) {
    return {
      lecture: {
        id: "",
        title: "",
        date: ""
      },
      course: {
        title: "",
        id: ""
      }
    };
  }
  let course = state.courses.find(course => course.id === ownProps.params.courseId);
  let lecture = course.lectures[ownProps.params.lectureId];
  lecture.title = ownProps.params.lectureId;
  return {
    course,
    lecture
  };
};
export default connect(mapStateToProps)(Lecture);
